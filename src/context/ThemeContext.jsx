import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("edu_erp_theme_mode") || "system";
    } catch {
      return "system";
    }
  });

  const computeTheme = (m) => {
    if (m === "light" || m === "dark") return m;
    // system
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(() => computeTheme(mode));

  useEffect(() => {
    const mql = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (mode === "system") setTheme(e.matches ? "dark" : "light");
    };
    if (mql) {
      if (mql.addEventListener) mql.addEventListener("change", onChange);
      else mql.addListener(onChange);
    }
    return () => {
      if (mql) {
        if (mql.removeEventListener) mql.removeEventListener("change", onChange);
        else mql.removeListener(onChange);
      }
    };
  }, [mode]);

  useEffect(() => {
    setTheme(computeTheme(mode));
    try { localStorage.setItem("edu_erp_theme_mode", mode); } catch {}
  }, [mode]);

  useEffect(() => {
    document.documentElement.classList.remove("theme-dark", "theme-light");
    document.documentElement.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  }, [theme]);

  function toggleTheme() {
    if (mode === "system") {
      // explicit opposite of current theme
      setMode(theme === "dark" ? "light" : "dark");
    } else {
      setMode((p) => (p === "dark" ? "light" : "dark"));
    }
  }

  return <ThemeContext.Provider value={{ mode, setMode, theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
