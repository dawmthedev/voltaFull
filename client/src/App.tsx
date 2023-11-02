import React from 'react';
import { LicenseInfo } from '@mui/x-license-pro';
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import ErrorAlert from './components/alert/Alert';
import { useAppSelector } from './hooks/hooks';
import { errorSelector, successSelector } from './redux/slice/errorSlice';

LicenseInfo.setLicenseKey('9e17734200a964cd420488accda5490fTz01ODkyOSxFPTE3MDY4NzA0MzEyMTAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

export default function App() {
  const error = useAppSelector(errorSelector);
  const success = useAppSelector(successSelector);
  return (
    <ThemeProvider>
      <ErrorAlert success={success} error={error} />
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
