import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";
import { createStyles } from "@/styles/settings.styles";
import { Text, View } from "react-native";

export default function HeaderSettings() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="settings" size={28} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>Settings</Text>
      </View>
    </View>
  );
}
