"use client";

import { useTheme } from './ThemeProvider';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <div className={`mx-auto max-w-4xl py-12 px-12 mb-32 min-h-screen
      text-gray-800 dark:text-white 
      transition-colors duration-300`}>
      {children}
    </div>
  );
}
