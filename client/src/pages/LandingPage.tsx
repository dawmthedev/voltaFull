import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../components/logo';

const LandingPage = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Logo />
        <Box>
          <Button component={Link} to="/login" color="inherit" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button component={Link} to="/register" variant="contained">
            Register
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Voltaic CRM
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
          Streamline your solar sales workflow and manage leads all in one place.
        </Typography>
        <Box>
          <Button component={Link} to="/register" variant="contained" size="large" sx={{ mr: 2 }}>
            Get Started
          </Button>
          <Button component={Link} to="/login" variant="outlined" size="large">
            Login
          </Button>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          py: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2">&copy; {new Date().getFullYear()} Voltaic CRM</Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
