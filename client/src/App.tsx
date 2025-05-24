import React from 'react';
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { Alerts } from './components/alert/Alert';

export default function App() {
  return (
    <ThemeProvider>
      <Alerts />
      <ScrollToTop />
      <Router />
    </ThemeProvider>
  );
}
