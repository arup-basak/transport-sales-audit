"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

const iconSize = 18;

const ToogleThemeButton = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    if (typeof window === undefined) return;

    // Check for user's preferred theme in localStorage
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Apply the theme
    applyTheme(savedTheme || "system");

    // Set up listener for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const isDark =
      newTheme === "dark" ||
      (newTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  };

  const toggleTheme = () => {
    const themeOrder: ("light" | "dark" | "system")[] = [
      "light",
      "dark",
      "system",
    ];
    const nextTheme =
      themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  const getThemeIcon = () => {
    if (theme === "system" && typeof window === undefined) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? (
        <Moon size={iconSize} />
      ) : (
        <Sun size={iconSize} />
      );
    }
    return theme === "light" ? (
      <Moon size={iconSize} />
    ) : (
      <Sun size={iconSize} />
    );
  };

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={`Current theme: ${theme}. Click to change.`}
      className="p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full"
      whileHover={{ scale: 1.1 }}
    >
      {getThemeIcon()}
    </motion.button>
  );
};

export default ToogleThemeButton;
