import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from 'react';
import { createLayoutStyles } from "../../constants/globalStyles";
import useTheme from "../../hooks/useTheme";

export default function TabLayout() {
  const { colors } = useTheme();
  const styles = createLayoutStyles(colors);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "News",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}