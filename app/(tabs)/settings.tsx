import DangerZone from "@/components/DangerZone";
import HeaderSettings from "@/components/HeaderSettings";
import Preferences from "@/components/Preferences";
import ProgressStats from "@/components/ProgressStats";
import useTheme from "@/hooks/useTheme";
import { createStyles } from "@/styles/settings.styles";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <HeaderSettings />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View>
          <Preferences />
        </View>
        <View>
          <ProgressStats />
        </View>
        <View>
          <DangerZone />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
