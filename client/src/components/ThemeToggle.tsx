import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

interface ThemeToggleProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = "md",
  className,
}) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has dark mode preference saved in localStorage
    const isDark = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    updateTheme(isDark);
  }, []);

  const toggleColorMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateTheme(newDarkMode);
  };

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  // Define size classes for button based on size prop
  const sizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3"
  }[size];

  return (
    <button
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      className={`rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${sizeClasses} ${className || ''}`}
    >
      {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
