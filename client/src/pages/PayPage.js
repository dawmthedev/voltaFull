import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import PayrollData from '../components/dataGrid/PayrollData'
import LeadGenPay from '../components/dataGrid/LeadGenPay';
import { useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';
export default function PayPage() {

  const { data } = useAppSelector(authSelector);
  const recordId = data?.recordID;
  return (
    <Box
      sx={{
       
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(145, 158, 171, 0.16)',
       width: '100%',
        overflow: 'auto',
        overflowX: 'hidden'
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
        <Box sx={{width: '100%', height: 'fit-content', overflow: 'auto', paddingTop: '1em' }}>
      
        <h4>Sales Commissions</h4>
          <PayrollData recordUserId={recordId}/>
 
        <h4>Lead generation Commissions</h4>
          <LeadGenPay recordUserId={recordId} />
       
       
   
          {/* <h1>Lead generation Commissions</h1>
          <LeadGenPay recordUserId={recordId} /> */}
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
