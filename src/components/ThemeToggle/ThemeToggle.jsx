import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 right-4 p-2 rounded-lg 
        bg-gray-900/25 dark:bg-gray-800/25 
        backdrop-blur-md 
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]
        border border-gray-200/20 dark:border-gray-700/20
        hover:bg-gray-300/50 dark:hover:bg-gray-600/50 
        transition-colors z-50"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-gray-200" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
