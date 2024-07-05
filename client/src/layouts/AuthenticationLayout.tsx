import React, { Fragment } from 'react';
import { Typography, Divider, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import Logo from '../components/logo'; // Ensure this component handles its presentation
import { Link } from 'react-router-dom';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  width: '100%',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.shadows[1] // Using one of the default shadows
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
  return (
    <Fragment>
      <Helmet>
        <title>{title} | Voltaic-CRM</title>
      </Helmet>

      <StyledRoot>
       
<img
src={`${process.env.PUBLIC_URL}/assets/images/iconImages/logo.png`} // Update the path accordingly
alt="Voltaic CRM Logo" // Provide a meaningful description for accessibility
style={{
  position: 'fixed',
  top: 100, // You can adjust these values as needed for responsive design

  maxWidth: '150px', // Maximum width of the logo
  maxHeight: '150px', // Maximum height of the logo
  width: 'auto', // Width relative to the height to keep aspect ratio
  height: 'auto', // Height relative to the width to keep aspect ratio
  objectFit: 'contain' // Ensures the image is scaled properly without being cropped
}}
/>
        <StyledContent>
          <Typography variant="h4" gutterBottom>
            Login to Voltaic-CRM
          </Typography>
          <Typography variant="body2" sx={{ mb: 5 }}>
            Don’t have an account? <Link to={link.to}>{link.text} here</Link>
          </Typography>
          <Divider sx={{ my: 3 }} />
          {children}
        </StyledContent>
      </StyledRoot>
    </Fragment>
  );
};

export default AuthenticationLayout;



