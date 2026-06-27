import { Ionicons } from "@expo/vector-icons";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { createStyles } from "@/styles/settings.styles";
import { useQuery } from "convex/react";
import { StyleSheet, Text, View } from "react-native";

export default function ProgressStats() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const statsStyles = createProgressStatsStyles(colors);

  const notes = useQuery(api.notes.getNotes, {});

  const total = notes?.length ?? 0;
  const completed = notes?.filter((n) => n.isCompleted).length ?? 0;
  const active = total - completed;

  const stats = [
    {
      label: "Total Notes",
      value: total,
      color: colors.primary,
      icon: "list" as const,
    },
    {
      label: "Completed",
      value: completed,
      color: colors.success,
      icon: "checkmark-circle" as const,
    },
    {
      label: "Active",
      value: active,
      color: colors.warning,
      icon: "time" as const,
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Progress</Text>
      <View style={statsStyles.row}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={[statsStyles.statCard, { borderLeftColor: stat.color }]}
          >
            <View style={[statsStyles.iconWrap, { backgroundColor: stat.color + "22" }]}>
              <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={[statsStyles.statNumber, { color: colors.text }]}>
              {stat.value}
            </Text>
            <Text style={[statsStyles.statLabel, { color: colors.textMuted }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const createProgressStatsStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      gap: 10,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.bg,
      borderRadius: 12,
      padding: 14,
      borderLeftWidth: 4,
      gap: 6,
    },
    iconWrap: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    statNumber: {
      fontSize: 28,
      fontWeight: "700",
      lineHeight: 32,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: "500",
    },
  });
