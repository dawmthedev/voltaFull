import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

export default function AnalyticsDashboard() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Analytics Dashboard</title>
      </Helmet>
      <Container>
        <h2>Analytics Dashboard</h2>
      </Container>
    </React.Fragment>
  );
}
