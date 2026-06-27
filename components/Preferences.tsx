import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";
import { createStyles } from "@/styles/settings.styles";
import { Switch, Text, View } from "react-native";

export default function Preferences() {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Preferences</Text>

      <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
        <View style={styles.settingLeft}>
          <View style={styles.settingIcon}>
            <Ionicons name="moon" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );
}
