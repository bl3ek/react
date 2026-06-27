import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import useTheme from "@/hooks/useTheme";

export const CATEGORIES = [
  { key: "Work", icon: "briefcase-outline", color: "#3B82F6" },
  { key: "Personal", icon: "person-outline", color: "#10B981" },
  { key: "Shopping", icon: "cart-outline", color: "#F59E0B" },
  { key: "Other", icon: "bookmark-outline", color: "#8B5CF6" },
] as const;

export type Category = (typeof CATEGORIES)[number]["key"];
export type CategoryOrAll = Category | "All";

interface Props {
  selected: CategoryOrAll;
  onSelect: (category: CategoryOrAll) => void;
  showAll?: boolean;
}

export default function CategoryPicker({ selected, onSelect, showAll }: Props) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {showAll && (
        <TouchableOpacity
          onPress={() => onSelect("All")}
          activeOpacity={0.7}
          style={[
            styles.chip,
            {
              backgroundColor: selected === "All" ? colors.primary + "28" : colors.surface,
              borderColor: selected === "All" ? colors.primary : colors.border,
            },
          ]}
        >
          <Ionicons
            name="apps-outline"
            size={16}
            color={selected === "All" ? colors.primary : colors.textMuted}
          />
          <Text style={[styles.chipText, { color: selected === "All" ? colors.primary : colors.textMuted }]}>
            All
          </Text>
        </TouchableOpacity>
      )}
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat.key;
        return (
          <TouchableOpacity
            key={cat.key}
            onPress={() => onSelect(cat.key)}
            activeOpacity={0.7}
            style={[
              styles.chip,
              {
                backgroundColor: isActive
                  ? cat.color + "28"
                  : colors.surface,
                borderColor: isActive ? cat.color : colors.border,
              },
            ]}
          >
            <Ionicons
              name={cat.icon as any}
              size={16}
              color={isActive ? cat.color : colors.textMuted}
            />
            <Text
              style={[
                styles.chipText,
                { color: isActive ? cat.color : colors.textMuted },
              ]}
            >
              {cat.key}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
