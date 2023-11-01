import React, { Fragment } from 'react';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
import Iconify from '../components/iconify';
import { Link } from 'react-router-dom';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const StyledSection = styled('div')(({ theme }: any) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

interface AuthenticationLayoutProps {
  title: string;
  children: React.ReactNode;
  link: {
    text: string;
    to: string;
  };
}

const AuthenticationLayout = ({ title, link, children }: AuthenticationLayoutProps) => {
  const mdUp = useResponsive('up', 'md');

  return (
    <Fragment>
      <Helmet>
        <title> {title} | RH -CRM </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 }
          }}
        />
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {title} to Voltaic-CRM
            </Typography>
            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link to={link.to}>{link.text} here</Link>
            </Typography>
            {/* <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:phone-fill" color="#1877F2" width={22} height={22} />
              </Button>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack> */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              .
              </Typography>
            </Divider>
            {children}
          </StyledContent>
        </Container>
      </StyledRoot>
    </Fragment>
  );
};

export default AuthenticationLayout;
