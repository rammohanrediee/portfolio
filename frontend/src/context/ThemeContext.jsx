import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "rmr-portfolio-theme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "paper";
    return window.localStorage.getItem(STORAGE_KEY) || "paper";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-paper", "theme-night");
    root.classList.add(theme === "night" ? "theme-night" : "theme-paper");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "night" ? "paper" : "night"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isNight: theme === "night" }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
