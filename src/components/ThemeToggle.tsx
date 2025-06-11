// ============================================================================
// THEME TOGGLE COMPONENT - Dark/Light Mode with Brand Colors
// Save as: components/ThemeToggle.tsx
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode (your current design)
  const [mounted, setMounted] = useState(false);

  // Hydration fix for SSR
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('brandgoto-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.remove('light-mode');
      root.classList.add('dark-mode');
      localStorage.setItem('brandgoto-theme', 'dark');
    } else {
      root.classList.remove('dark-mode');
      root.classList.add('light-mode');
      localStorage.setItem('brandgoto-theme', 'light');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (!mounted) {
    // Prevent hydration mismatch
    return (
      <div className={`theme-toggle-container ${className}`}>
        <div className="theme-toggle-skeleton" />
      </div>
    );
  }

  return (
    <div className={`theme-toggle-container ${className}`}>
      <motion.button
        onClick={toggleTheme}
        className="theme-toggle-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {/* Toggle Track */}
        <motion.div
          className="toggle-track"
          animate={{
            backgroundColor: isDark ? '#1a1a1a' : '#f0f9ff',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Toggle Thumb */}
          <motion.div
            className="toggle-thumb"
            animate={{
              x: isDark ? 0 : 28,
              backgroundColor: isDark ? '#F75F0B' : '#2FA0B5',
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          >
            {/* Icon Container */}
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                  className="icon-container"
                >
                  <Moon size={14} color="#ffffff" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                  className="icon-container"
                >
                  <Sun size={14} color="#ffffff" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Background Icons */}
          <div className="background-icons">
            <motion.div
              className="bg-icon moon-bg"
              animate={{
                opacity: isDark ? 0.3 : 0,
                scale: isDark ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            >
              <Moon size={12} color="#666" />
            </motion.div>
            <motion.div
              className="bg-icon sun-bg"
              animate={{
                opacity: isDark ? 0 : 0.3,
                scale: isDark ? 0.8 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Sun size={12} color="#666" />
            </motion.div>
          </div>
        </motion.div>

        {/* Ripple Effect */}
        <motion.div
          className="toggle-ripple"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 2, opacity: 0.2 }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>

      {/* Optional Label */}
      <span className="theme-label">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </div>
  );
};

export default ThemeToggle;