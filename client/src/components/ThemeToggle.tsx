import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";

interface ThemeToggleProps {
  size?: string;
  className?: string; // Add this line
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = "md",
  className,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
      variant="ghost"
      onClick={toggleColorMode}
      size={size as any}
      className={className}
    />
  );
};

export default ThemeToggle;
