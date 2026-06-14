import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createSettingsStyles } from "../../constants/globalStyles";
import useTheme from "../../hooks/useTheme";

export default function SettingsScreen() {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const styles = createSettingsStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        
        <TouchableOpacity onPress={toggleDarkMode} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}