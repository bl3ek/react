import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "@/hooks/useTheme";

export type Filter = "all" | "active" | "completed";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Done" },
];

interface Props {
  active: Filter;
  counts: { all: number; active: number; completed: number };
  onSelect: (filter: Filter) => void;
}

export default function FilterButtons({ active, counts, onSelect }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      {FILTERS.map((f) => {
        const isActive = active === f.key;
        return (
          <TouchableOpacity
            key={f.key}
            onPress={() => onSelect(f.key)}
            activeOpacity={0.7}
            style={[
              styles.pill,
              isActive && { backgroundColor: colors.primary },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: isActive ? "#FFFFFF" : colors.textMuted },
                isActive && styles.labelActive,
              ]}
            >
              {f.label}{" "}
              <Text style={[styles.count, { color: isActive ? "#FFFFFF" : colors.textMuted }]}>
                {counts[f.key]}
              </Text>
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    gap: 4,
  },
  pill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 9,
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
  },
  labelActive: {
    fontWeight: "700",
  },
  count: {
    fontSize: 12,
  },
});
