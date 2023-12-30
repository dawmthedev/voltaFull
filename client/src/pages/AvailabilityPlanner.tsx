import { Box, Container } from '@mui/material';
import React from 'react';
import WeekCalendar from '../components/calendar/WeekCalender';

const AvaiabilityPlanner = () => {
  return (
    <Container>
      <h1>Availability Planner</h1>
   {/* <MyCalendar value={'email'} getActionData={() => {}} /> */}
    <WeekCalendar value={'email'} getActionData={() => {}} />
    </Container>
  );
};

export default AvaiabilityPlanner;
