import { Ionicons } from "@expo/vector-icons";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { createStyles } from "@/styles/settings.styles";
import { useMutation } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DangerZone() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const dangerStyles = createDangerStyles(colors);

  const clearAllNotes = useMutation(api.notes.clearAllNotes);

  return (
    <View style={[styles.section, dangerStyles.section]}>
      <Text style={[styles.sectionTitle, { color: colors.danger }]}>
        Danger Zone
      </Text>

      <TouchableOpacity
        style={dangerStyles.button}
        onPress={() => clearAllNotes()}
        activeOpacity={0.7}
      >
        <View style={dangerStyles.buttonLeft}>
          <View style={dangerStyles.iconWrap}>
            <Ionicons name="trash" size={18} color={colors.danger} />
          </View>
          <Text style={[dangerStyles.buttonText, { color: colors.danger }]}>
            Reset App
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
}

const createDangerStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    section: {
      borderColor: colors.danger + "40",
      borderWidth: 1,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
    },
    buttonLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    iconWrap: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.danger + "18",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
    },
  });
