import React from 'react';
import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    ...baseTheme.colors,
    sand: {
      50: '#fdf7f0',
      100: '#f9e8d2',
      200: '#f2d1a6',
      300: '#e9ba79',
      400: '#e1a44d',
      500: '#c88a33',
      600: '#9d6d26',
      700: '#725019',
      800: '#47330c',
      900: '#1f1600'
    }
  },
  space: {
    px: '1px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px'
  },
  radii: {
    ...baseTheme.radii,
    '2xl': '1rem'
  },
  shadows: {
    ...baseTheme.shadows,
    soft: '0 2px 4px rgba(0,0,0,0.08)'
  }
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
