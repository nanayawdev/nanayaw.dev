import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  const toggleTheme = () => {
    console.log('Current darkMode:', darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-4 h-4 text-gray-200" />
      ) : (
        <Moon className="w-4 h-4 text-gray-600" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
