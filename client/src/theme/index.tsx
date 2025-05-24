import React from "react";
import { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import { getPalette } from "./palette";
import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import customShadows from "./customShadows";
import componentsOverride from "./overrides";

export default function ThemeProvider({
  children,
  mode = 'light',
}: {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
}) {
  const themeOptions = useMemo(
    () => ({
      palette: getPalette(mode),
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    [mode]
  );

  const theme = createTheme(themeOptions as any );
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
