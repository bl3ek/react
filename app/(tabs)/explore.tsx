import { Ionicons } from "@expo/vector-icons";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CategoryPicker, { CATEGORIES, Category, CategoryOrAll } from "@/components/CategoryPicker";
import FilterButtons, { Filter } from "@/components/FilterButtons";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotesScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [inputText, setInputText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryOrAll>("All");
  const [filter, setFilter] = useState<Filter>("all");

  const addCategory: Category = categoryFilter === "All" ? "Work" : categoryFilter;

  const allNotes = useQuery(api.notes.getNotes, {});
  const activeNotes = useQuery(api.notes.getNotes, { filter: "active" });
  const completedNotes = useQuery(api.notes.getNotes, { filter: "completed" });

  const addNote = useMutation(api.notes.addNote);
  const toggleNote = useMutation(api.notes.toggleNote);
  const deleteNote = useMutation(api.notes.deleteNote);
  const updateNoteCategory = useMutation(api.notes.updateNoteCategory);

  const byStatus =
    filter === "active"
      ? activeNotes
      : filter === "completed"
      ? completedNotes
      : allNotes;

  const notesToDisplay =
    categoryFilter === "All"
      ? byStatus
      : byStatus?.filter((n) => n.category === categoryFilter);

  const counts = {
    all: (categoryFilter === "All" ? allNotes : allNotes?.filter((n) => n.category === categoryFilter))?.length ?? 0,
    active: (categoryFilter === "All" ? activeNotes : activeNotes?.filter((n) => n.category === categoryFilter))?.length ?? 0,
    completed: (categoryFilter === "All" ? completedNotes : completedNotes?.filter((n) => n.category === categoryFilter))?.length ?? 0,
  };

  const handleAdd = () => {
    const text = inputText.trim();
    if (!text) return;
    addNote({ text, category: addCategory });
    setInputText("");
  };

  const handleCycleCategory = (id: Id<"notes">, current: string) => {
    const idx = CATEGORIES.findIndex((c) => c.key === current);
    const next = CATEGORIES[(idx + 1) % CATEGORIES.length].key;
    updateNoteCategory({ id, category: next });
  };

  const getCategoryMeta = (key: string) =>
    CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[3];

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        {/* Input row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="New note..."
            placeholderTextColor={colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.7}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Category picker / filter */}
        <CategoryPicker selected={categoryFilter} onSelect={setCategoryFilter} showAll />

        {/* Filter buttons */}
        <View style={styles.filterWrap}>
          <FilterButtons active={filter} counts={counts} onSelect={setFilter} />
        </View>

        {/* Notes list */}
        <FlatList
          data={notesToDisplay}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="document-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyText}>
                {filter === "active"
                  ? "No active notes. Time to add one!"
                  : filter === "completed"
                  ? "No completed notes yet. Keep going!"
                  : "No notes yet. Start adding!"}
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const meta = getCategoryMeta(item.category);
            return (
              <View style={styles.card}>
                {/* Category badge */}
                <TouchableOpacity
                  style={[styles.badge, { backgroundColor: meta.color + "28", borderColor: meta.color }]}
                  onPress={() => handleCycleCategory(item._id, item.category)}
                  activeOpacity={0.7}
                >
                  <Ionicons name={meta.icon as any} size={14} color={meta.color} />
                  <Text style={[styles.badgeText, { color: meta.color }]}>{item.category}</Text>
                </TouchableOpacity>

                {/* Note text */}
                <TouchableOpacity
                  style={styles.noteTextWrap}
                  onPress={() => toggleNote({ id: item._id })}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.noteText,
                      { color: colors.text },
                      item.isCompleted && styles.noteTextDone,
                    ]}
                  >
                    {item.text}
                  </Text>
                </TouchableOpacity>

                {/* Delete button */}
                <TouchableOpacity
                  onPress={() => deleteNote({ id: item._id })}
                  style={styles.deleteBtn}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.bg },
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
    inputRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 12,
    },
    input: {
      flex: 1,
      backgroundColor: colors.surface,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 15,
    },
    addBtn: {
      backgroundColor: colors.primary,
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    filterWrap: {
      marginTop: 12,
      marginBottom: 14,
    },
    list: {
      gap: 10,
      paddingBottom: 24,
    },
    card: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      padding: 14,
      gap: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      borderWidth: 1,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "600",
    },
    noteTextWrap: {
      flex: 1,
    },
    noteText: {
      fontSize: 15,
      lineHeight: 22,
    },
    noteTextDone: {
      textDecorationLine: "line-through",
      opacity: 0.5,
    },
    deleteBtn: {
      alignSelf: "flex-end",
      padding: 4,
    },
    empty: {
      alignItems: "center",
      paddingTop: 60,
      gap: 12,
    },
    emptyText: {
      color: colors.textMuted,
      fontSize: 15,
      textAlign: "center",
    },
  });
