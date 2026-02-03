"use client";

import { useTheme, type ThemeName } from "@/contexts/ThemeContext";
import { Palette, Check } from "lucide-react";
import { useState } from "react";

const themeOptions: { name: ThemeName; label: string; colors: string[] }[] = [
  {
    name: "purple",
    label: "Purple Dream",
    colors: ["#9333ea", "#ec4899", "#f97316"],
  },
  {
    name: "green",
    label: "Fresh Green",
    colors: ["#10b981", "#14b8a6", "#84cc16"],
  },
  {
    name: "blue",
    label: "Ocean Blue",
    colors: ["#3b82f6", "#06b6d4", "#0ea5e9"],
  },
  { name: "red", label: "Ruby Red", colors: ["#f43f5e", "#ef4444", "#f59e0b"] },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5 text-gray-700" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Choose Theme
            </h3>
            <div className="space-y-2">
              {themeOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    setTheme(option.name);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    theme === option.name
                      ? "bg-gray-100 border-2 border-gray-300"
                      : "border-2 border-transparent hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {option.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {option.label}
                    </span>
                  </div>
                  {theme === option.name && (
                    <Check className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
