"use client";

import { useTheme } from './ThemeProvider';
import { useState } from 'react';

// Sun Icon Component
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

// Moon Icon Component
const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        fixed top-6 right-6 z-50
        w-12 h-12 rounded-2xl
        bg-white/90 dark:bg-gray-800/90
        backdrop-blur-sm
        border border-gray-200/50 dark:border-gray-700/50
        shadow-lg hover:shadow-xl
        transform transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        flex items-center justify-center
        text-gray-700 dark:text-gray-300
        hover:text-orange-500 dark:hover:text-orange-400
        ${isAnimating ? 'rotate-180' : 'rotate-0'}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="transform transition-all duration-300">
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </div>
    </button>
  );
}