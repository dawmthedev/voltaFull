import React from 'react';
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import Alert from './components/alert/Alert';
export default function App() {
  return (
    <ThemeProvider>
      <Alert open={false} message="" />
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
