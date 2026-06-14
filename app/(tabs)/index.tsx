import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNewsStyles } from "../../constants/globalStyles";
import useTheme from "../../hooks/useTheme";

export default function NewsScreen() {
  const { colors } = useTheme();
  const styles = createNewsStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>News</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>React Native 0.76 Released!</Text>
          <Text style={styles.cardBody}>
            Discover the new features in the latest React Native release,
            including the new architecture enabled by default, faster startup
            times, and improved rendering performance.
          </Text>
          <TouchableOpacity style={styles.cardButton} activeOpacity={0.8}>
            <Text style={styles.cardButtonText}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}