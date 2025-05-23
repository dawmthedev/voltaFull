import React from 'react';
import Router from './routes';
import AppThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import Alert from './components/alert/Alert';
export default function App() {
  return (
    <AppThemeProvider>
      <Alert open={false} message="" />
      <ScrollToTop />
      <StyledChart />
      <Router />
    </AppThemeProvider>
  );
}
