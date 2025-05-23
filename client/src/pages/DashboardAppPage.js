import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Voltaic </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
      </Container>
    </>
  );
}
