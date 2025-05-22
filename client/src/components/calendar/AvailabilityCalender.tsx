import React from 'react';

export interface CalendarProps {
  value?: string;
  getActionData?: (value: string, name: string) => void;
}

const WeekCalendar: React.FC<CalendarProps> = () => {
  return <div>Availability Calendar</div>;
};

export default WeekCalendar;
