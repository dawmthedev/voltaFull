import React from 'react';
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { Alerts } from './components/alert/Alert';
import { ColorModeProvider, useColorMode } from './theme/colorMode';

function AppContent() {
  const { mode } = useColorMode();

  return (
    <ThemeProvider mode={mode}>
      <Alerts />
      <ScrollToTop />
      <Router />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ColorModeProvider>
      <AppContent />
    </ColorModeProvider>
  );
}
