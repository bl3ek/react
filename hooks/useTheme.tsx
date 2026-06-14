import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Опис типів для палітри кольорів
export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  primary: string;
  border: string;
  shadow: string;
}

// Конкретні палітри кольорів для обох тем
const lightColors: ColorScheme = {
  bg: '#f8fafc',
  surface: '#ffffff',
  text: '#0f172a',
  textMuted: '#64748b',
  primary: '#2dd4bf', // Стильний бірюзовий колір
  border: '#e2e8f0',
  shadow: '#0f172a',
};

const darkColors: ColorScheme = {
  bg: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  primary: '#2dd4bf',
  border: '#334155',
  shadow: '#000000',
};

interface ThemeContextType {
  colors: ColorScheme;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = '@news_app_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Завантаження теми з пам'яті при запуску
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Помилка завантаження теми:', error);
      }
    };
    loadTheme();
  }, []);

  // Перемикач теми із збереженням в AsyncStorage
  const toggleDarkMode = async () => {
    try {
      const nextTheme = !isDarkMode;
      setIsDarkMode(nextTheme);
      await AsyncStorage.setItem(THEME_KEY, nextTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Помилка збереження теми:', error);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme має використовуватись всередині ThemeProvider');
  }
  return context;
}