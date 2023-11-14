import React from 'react';
import MyCalendar from '../components/calendar/Calendar';

const Planner = () => {
  return (
    <div>
      <h1>Planner</h1>
      <MyCalendar value={'email'} getActionData={() => {}} />
    </div>
  );
};

export default Planner;
