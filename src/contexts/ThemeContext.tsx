"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  primaryLight: string;
  secondaryLight: string;
  accentLight: string;
};

// Helper to generate complete Tailwind classes
export type ThemeClasses = {
  // Backgrounds
  bgPrimary50: string;
  bgPrimary100: string;
  bgPrimary600: string;
  bgPrimary700: string;
  bgSecondary50: string;
  bgSecondary100: string;
  bgSecondary600: string;
  bgSecondary700: string;
  bgAccent50: string;
  bgAccent100: string;
  bgAccent500: string;
  bgAccent600: string;
  
  // Text colors
  textPrimary600: string;
  textPrimary700: string;
  textPrimary800: string;
  textPrimary900: string;
  textSecondary600: string;
  textSecondary700: string;
  textAccent600: string;
  
  // Border colors
  borderPrimary100: string;
  borderPrimary300: string;
  borderPrimary400: string;
  borderPrimary500: string;
  borderPrimary600: string;
  borderSecondary100: string;
  borderSecondary300: string;
  borderAccent100: string;
  borderAccent300: string;
  
  // Gradients
  gradientPrimary: string;
  gradientFull: string;
  
  // Hover states
  hoverTextPrimary600: string;
  hoverTextPrimary700: string;
  hoverBgPrimary50: string;
  hoverBgPrimary700: string;
  hoverBorderPrimary300: string;
};

export type ThemeName = "purple" | "green" | "blue" | "red";

export const themes: Record<ThemeName, ThemeColors> = {
  purple: {
    primary: "purple",
    secondary: "pink",
    accent: "orange",
    primaryLight: "purple",
    secondaryLight: "pink",
    accentLight: "orange",
  },
  green: {
    primary: "emerald",
    secondary: "teal",
    accent: "lime",
    primaryLight: "emerald",
    secondaryLight: "teal",
    accentLight: "lime",
  },
  blue: {
    primary: "blue",
    secondary: "cyan",
    accent: "sky",
    primaryLight: "blue",
    secondaryLight: "cyan",
    accentLight: "sky",
  },
  red: {
    primary: "rose",
    secondary: "red",
    accent: "amber",
    primaryLight: "rose",
    secondaryLight: "red",
    accentLight: "amber",
  },
};

function generateThemeClasses(colors: ThemeColors): ThemeClasses {
  return {
    // Backgrounds
    bgPrimary50: `bg-${colors.primary}-50`,
    bgPrimary100: `bg-${colors.primary}-100`,
    bgPrimary600: `bg-${colors.primary}-600`,
    bgPrimary700: `bg-${colors.primary}-700`,
    bgSecondary50: `bg-${colors.secondary}-50`,
    bgSecondary100: `bg-${colors.secondary}-100`,
    bgSecondary600: `bg-${colors.secondary}-600`,
    bgSecondary700: `bg-${colors.secondary}-700`,
    bgAccent50: `bg-${colors.accent}-50`,
    bgAccent100: `bg-${colors.accent}-100`,
    bgAccent500: `bg-${colors.accent}-500`,
    bgAccent600: `bg-${colors.accent}-600`,
    
    // Text colors
    textPrimary600: `text-${colors.primary}-600`,
    textPrimary700: `text-${colors.primary}-700`,
    textPrimary800: `text-${colors.primary}-800`,
    textPrimary900: `text-${colors.primary}-900`,
    textSecondary600: `text-${colors.secondary}-600`,
    textSecondary700: `text-${colors.secondary}-700`,
    textAccent600: `text-${colors.accent}-600`,
    
    // Border colors
    borderPrimary100: `border-${colors.primary}-100`,
    borderPrimary300: `border-${colors.primary}-300`,
    borderPrimary400: `border-${colors.primary}-400`,
    borderPrimary500: `border-${colors.primary}-500`,
    borderPrimary600: `border-${colors.primary}-600`,
    borderSecondary100: `border-${colors.secondary}-100`,
    borderSecondary300: `border-${colors.secondary}-300`,
    borderAccent100: `border-${colors.accent}-100`,
    borderAccent300: `border-${colors.accent}-300`,
    
    // Gradients
    gradientPrimary: `bg-gradient-to-r from-${colors.primary}-600 to-${colors.secondary}-600`,
    gradientFull: `bg-gradient-to-r from-${colors.primary}-600 via-${colors.secondary}-600 to-${colors.accent}-500`,
    
    // Hover states
    hoverTextPrimary600: `hover:text-${colors.primary}-600`,
    hoverTextPrimary700: `hover:text-${colors.primary}-700`,
    hoverBgPrimary50: `hover:bg-${colors.primary}-50`,
    hoverBgPrimary700: `hover:bg-${colors.primary}-700`,
    hoverBorderPrimary300: `hover:border-${colors.primary}-300`,
  };
}

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
  classes: ThemeClasses;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("purple");

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("ssaige-theme") as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem("ssaige-theme", newTheme);
  };

  const themeColors = themes[theme];
  const themeClasses = generateThemeClasses(themeColors);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themeColors, classes: themeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Helper function to get Tailwind color classes
export function getColorClass(
  baseColor: string,
  shade: string,
  type: "bg" | "text" | "border" | "from" | "to" | "via"
): string {
  return `${type}-${baseColor}-${shade}`;
}
