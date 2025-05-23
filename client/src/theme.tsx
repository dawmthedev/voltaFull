import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import palette from './theme/palette';
import typography from './theme/typography';
import shadows from './theme/shadows';
import customShadows from './theme/customShadows';
import ComponentsOverrides from './theme/overrides';

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    palette,
    typography,
    shadows: shadows(),
  });

  theme.components = ComponentsOverrides(theme);
  (theme as any).customShadows = customShadows();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProviderWrapper>{children}</ThemeProviderWrapper>;
}
