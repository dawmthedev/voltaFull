import React from 'react';

export interface CalendarProps {
  value?: string;
  getActionData?: (value: string, name: string) => void;
}

const MyCalendar: React.FC<CalendarProps> = () => {
  return <div>Calendar</div>;
};

export default MyCalendar;
