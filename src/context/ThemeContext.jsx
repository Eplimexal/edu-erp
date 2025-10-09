import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // store the user's mode selection: 'system' | 'light' | 'dark'
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('edu_erp_theme_mode') || 'system';
    } catch {
      return 'system';
    }
  });

  // computed effective theme: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    if (mode === 'light' || mode === 'dark') return mode;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Keep effective theme in sync when system preference changes
  useEffect(() => {
    const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    function onChange(e) {
      if (mode === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    }
    if (mql) {
      // add listener in a cross-browser way
      if (mql.addEventListener) mql.addEventListener('change', onChange);
      else mql.addListener(onChange);
    }
    return () => {
      if (mql) {
        if (mql.removeEventListener) mql.removeEventListener('change', onChange);
        else mql.removeListener(onChange);
      }
    };
  }, [mode]);

  // When mode changes, compute effective theme and persist preference
  useEffect(() => {
    if (mode === 'system') {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
    } else {
      setTheme(mode);
    }
    try { localStorage.setItem('edu_erp_theme_mode', mode); } catch {}
  }, [mode]);

  // Apply CSS class to root so styles pick up theme tokens
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  // toggle helper: cycles between light/dark.
  function toggleTheme() {
    // if user was in 'system' mode -> set explicit opposite of current theme
    if (mode === 'system') {
      setMode(theme === 'dark' ? 'light' : 'dark');
      return;
    }
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
