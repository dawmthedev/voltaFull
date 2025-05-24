import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

export default function MessagingNotifications() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Messaging & Notifications</title>
      </Helmet>
      <Container>
        <h2>Messaging & Notifications</h2>
      </Container>
    </React.Fragment>
  );
}
