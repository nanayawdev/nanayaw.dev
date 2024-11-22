import React, { createContext, useContext, useEffect } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useDarkMode();

  // Apply theme class on mount and changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
