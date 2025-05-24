import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Header from './header';
import Nav from './nav';

// Constants for app bar heights
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

// Root container for normal layout
const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

// Main content area, also used for maintenance message center
const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#D2C5B4',
  color: 'white',
  minHeight: '100vh',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const isMaintenance = false; // toggle to false to restore normal layout

  // Maintenance screen
  if (isMaintenance) {
    return (
      <Main>
        <Typography variant="h4">App in maintenance</Typography>
      </Main>
    );
  }

  // Normal layout when not in maintenance
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
