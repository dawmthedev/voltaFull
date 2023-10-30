import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import PayrollData from '../components/dataGrid/PayrollData'


export default function PayPage() {
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
        <title> Payroll </title>
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
          <PayrollData />
        </Box>
      </Box>
    </Box>
  );
}
