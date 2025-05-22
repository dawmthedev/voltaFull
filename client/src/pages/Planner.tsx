import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import React from 'react';
import MyCalendar from '../components/calendar/Calendar';

const Planner = () => {
  return (
    <Container>
      <h1>Planner</h1>
      <MyCalendar value={'email'} getActionData={() => {}} />
    </Container>
  );
};
export default Planner;
