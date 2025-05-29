import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { FiSun, FiMoon } from 'react-icons/fi'

const ThemeToggle: React.FC<{size?: string}> = ({ size = 'md' }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
      variant="ghost"
      onClick={toggleColorMode}
      size={size as any}
    />
  )
}

export default ThemeToggle
