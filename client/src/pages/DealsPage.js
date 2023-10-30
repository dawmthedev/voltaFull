import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';

import DealsData from '../components/dataGrid/DealsData';

export default function DealsPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(145, 158, 171, 0.16)',
      }}
    >
      <Helmet>
        <title> Deals </title>
      </Helmet>

      <Box
        sx={{
          width: '100vw',
          paddingX: {
            md: '40px',
            xs: '2px',
          },
        }}
      >
        <Box sx={{ width: '100%', height: 'fit-content' }}>
          {/* <DataGridProCSV /> */}
          <DealsData />
        </Box>
      </Box>
    </Box>
  );
}
