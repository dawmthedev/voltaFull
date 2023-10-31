import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import PayrollData from '../components/dataGrid/PayrollData'
import LeadGenPay from '../components/dataGrid/LeadGenPay';

export default function PayPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(145, 158, 171, 0.16)',
      }}
    >
      <Helmet>
        <title>Payroll</title>
      </Helmet>

      <Box
        sx={{
          width: '100vw',
          paddingX: {
            md: '40px',
            xs: '2px',
          },
          boxSizing: 'border-box',  // ensures that padding does not increase the box's size beyond 100vw
        }}
      >
        <Box sx={{ width: '100%', height: 'fit-content', overflow: 'auto' }}>
          <h1>Sales Commissions</h1>
          <PayrollData />
          <h1>Lead generation Commissions</h1>
          <LeadGenPay />
        </Box>
      </Box>
    </Box>
  );
}

// export default function PayPage() {
//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignContent: 'center',
//         backgroundColor: 'rgba(145, 158, 171, 0.16)',
     
//       }}
//     >
//       <Helmet>
//         <title> Payroll </title>
//       </Helmet>

//       <Box
//         sx={{
//           width: '100vw',
//           paddingX: {
//             md: '40px',
//             xs: '2px',
//           },
//         }}
//       >
//         <Box sx={{ width: '100%', height: 'fit-content' }}>
//           {/* <DataGridProCSV /> */}
//           <h1>Sales Commissions</h1>
//           <PayrollData />
//           <h1>Lead generation Commissions</h1>
//           <PayrollData />
//         </Box>
//       </Box>
//     </Box>
//   );
// }
