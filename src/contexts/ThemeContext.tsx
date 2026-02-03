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

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themes[theme] }}>
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
