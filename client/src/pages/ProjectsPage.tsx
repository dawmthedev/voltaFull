import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

export default function ProjectsPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Projects</title>
      </Helmet>
      <Container>
        <h2>Projects</h2>
      </Container>
    </React.Fragment>
  );
}
