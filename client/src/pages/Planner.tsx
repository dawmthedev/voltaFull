import { Box } from '@mui/material';
import React from 'react';
import MyCalendar from '../components/calendar/Calendar';

const Planner = () => {
  return (
    <Box
      sx={{
        width: '95%'
      }}
    >
      <h1>Planner</h1>
      <MyCalendar value={'email'} getActionData={() => {}} />
    </Box>
  );
};

export default Planner;
