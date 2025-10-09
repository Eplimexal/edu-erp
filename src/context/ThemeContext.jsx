import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('edu_erp_theme_mode') || 'system';
    } catch {
      return 'system';
    }
  });

  const [theme, setTheme] = useState(() => {
    if (mode === 'light' || mode === 'dark') return mode;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    function handle(e) {
      if (mode === 'system') setTheme(e.matches ? 'dark' : 'light');
    }
    if (mql) {
      mql.addEventListener ? mql.addEventListener('change', handle) : mql.addListener(handle);
    }
    return () => {
      if (mql) {
        mql.removeEventListener ? mql.removeEventListener('change', handle) : mql.removeListener(handle);
      }
    };
  }, [mode]);

  useEffect(() => {
    if (mode === 'system') {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
    } else {
      setTheme(mode);
    }
    try {
      localStorage.setItem('edu_erp_theme_mode', mode);
    } catch {}
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  return <ThemeContext.Provider value={{ mode, setMode, theme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
