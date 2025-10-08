import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // mode: 'system' | 'light' | 'dark'
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('edu_erp_theme_mode') || 'system';
    } catch {
      return 'system';
    }
  });

  // computed theme: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    if (mode === 'light' || mode === 'dark') return mode;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // listen to system changes if mode === 'system'
  useEffect(() => {
    const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    function applySystem(e) {
      if (mode === 'system') setTheme(e.matches ? 'dark' : 'light');
    }

    if (mql) {
      mql.addEventListener ? mql.addEventListener('change', applySystem) : mql.addListener(applySystem);
    }

    return () => {
      if (mql) {
        mql.removeEventListener ? mql.removeEventListener('change', applySystem) : mql.removeListener(applySystem);
      }
    };
  }, [mode]);

  // when mode changes compute theme and persist
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

  // apply a class to <html> so CSS can override
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
