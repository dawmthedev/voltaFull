import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import React from 'react';
import AvailabilityCalendar from '../components/calendar/AvailabilityCalender';

const AvaiabilityPlanner = () => {
  return (
    <Container>
      <h1>Availability</h1>
      <AvailabilityCalendar value={'email'} getActionData={() => {}} />
    </Container>
  );
};
export default AvaiabilityPlanner;
