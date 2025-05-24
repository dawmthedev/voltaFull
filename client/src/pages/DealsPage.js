import React from 'react'; // Import React as a whole without destructuring
import { Helmet } from 'react-helmet-async';
import { Container, ToggleButtonGroup, ToggleButton, Card } from '@mui/material';

import DealsData from '../components/dataGrid/DealsData'; // Assuming this is your chart
import { useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';

export default function DealsPage() {
  const { data } = useAppSelector(authSelector);
  const recordId = data?.recordID;

  const [type, setType] = React.useState('projects');
  const handleType = (_, v) => {
    if (v) setType(v);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Deals</title>
      </Helmet>
      <Container>
        <ToggleButtonGroup value={type} exclusive onChange={handleType} sx={{ mb: 2 }}>
          <ToggleButton value="projects">Projects</ToggleButton>
          <ToggleButton value="products">Products</ToggleButton>
        </ToggleButtonGroup>
        <Card sx={{ p: '1rem' }}>
          <DealsData recordUserId={recordId} type={type} />
        </Card>
      </Container>
    </React.Fragment>
  );
}


// import * as React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Box, Card, Container } from '@mui/material';

// import DealsData from '../components/dataGrid/DealsData';
// import { useAppSelector } from '../hooks/hooks';
// import { authSelector } from '../redux/slice/authSlice';

// import DealsDataLeadgen from '../components/dataGrid/DealsDataLeadgen';
// import { Fragment } from 'react';

// export default function DealsPage() {
//   const { data } = useAppSelector(authSelector);
//   const recordId = data?.recordID;

//   return (
//     <Fragment>
//       <Helmet>
//         <title> Deals </title>
//       </Helmet>
//       <Container>
//         {/* <DataGridProCSV /> */}
//         <h2>Projects</h2>
//         <Card sx={{ p: '1rem' }}>
//           <DealsData recordUserId={recordId} />
//         </Card>
//         <Box mt={6}>
//           {/* <h2>Leadgen Deals</h2> */}
//           {/* <Card sx={{ p: '1rem' }}>
//             <DealsDataLeadgen recordUserId={recordId} />
//           </Card> */}
//         </Box>
//       </Container>
//     </Fragment>
//   );
// }
