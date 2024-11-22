import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineWifiTetheringOff } from 'react-icons/md';
import { HashLoader } from 'react-spinners';
import { darkTheme, lightTheme } from '../../theme';
import { useTheme } from '../../contexts/ThemeContext';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { darkMode } = useTheme();

  const theme = useMemo(() => darkMode ? darkTheme : lightTheme, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === null) {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      onLoadingComplete?.();
    }
  }, [progress, onLoadingComplete]);

  const updateProgress = useCallback(() => {
    if (isOnline) {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }
  }, [isOnline]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setProgress(0);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    let interval;
    if (isOnline) {
      interval = setInterval(updateProgress, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [updateProgress, isOnline]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 ${theme.background} dark:bg-gray-900 flex flex-col items-center justify-center z-50`}
    >
      {!isOnline ? (
        <div className={`text-center ${theme.text} dark:text-white`}>
          <MdOutlineWifiTetheringOff className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">Connection Lost</h2>
          <p className={`${theme.secondary} dark:text-gray-300`}>Please check your internet connection</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <HashLoader 
            color={darkMode ? "#ffffff" : "#fa003e"} 
            size={50} 
            loading={true}
          />
          <div className="text-center">
            <h2 className={`${theme.text} dark:text-white text-xl font-bold mb-2`}>
              Entering my Realm
            </h2>
            <span className={`${theme.secondary} dark:text-gray-300`}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
} 