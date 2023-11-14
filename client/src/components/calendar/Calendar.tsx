import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';
import React, { useCallback, useMemo, useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ClickAway from '../click-away/ClickAway';

interface CalendarProps {
  value: string;
  getActionData: (value: string, name: string) => void;
}

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Event 1',
    start: new Date(2023, 10, 15, 10, 0), // Year, Month (0-indexed), Day, Hour, Minute
    end: new Date(2023, 10, 15, 12, 0)
  }
];

const MyCalendar = ({ value, getActionData }: CalendarProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [myEvents, setEvents] = useState(events);

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6)
    }),
    []
  );
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name');
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback((event) => window.alert(event.title), []);

  return (
    <Box>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        defaultDate={defaultDate}
        defaultView={Views.MONTH}
        style={{ height: 500 }}
        selectable={true}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        scrollToTime={scrollToTime}
      />
      {/* <ClickAway open={isDropDownOpen} setOpen={setIsDropDownOpen}>
        <Select
          value={value}
          name="type"
          label="Select Type"
          onChange={(e: SelectChangeEvent) => {
            getActionData(e.target.value, e.target.name);
          }}
          sx={{
            '& .MuiSelect-select': {
              textTransform: 'capitalize',
              color: '#0c71edd8'
            }
          }}
        >
          {ACTIONS.map((action: ActionTypes) => (
            <MenuItem
              key={action.id}
              value={action.value}
              sx={{
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  color: '#0c71edd8'
                }
              }}
            >
              {action.name}
            </MenuItem>
          ))}
        </Select>
      </ClickAway> */}
    </Box>
  );
};

export default MyCalendar;

type ActionTypes = {
  id: number;
  name: string;
  value: string;
  icon: string;
};

const ACTIONS: ActionTypes[] = [
  {
    id: 1,
    name: 'Schedule Email',
    value: 'email',
    icon: 'email'
  },
  {
    id: 2,
    name: 'Schedule Post',
    value: 'post',
    icon: 'post'
  },
  {
    id: 3,
    name: 'Schedule Story',
    value: 'story',
    icon: 'story'
  },
  {
    id: 4,
    name: 'Schedule Ad',
    value: 'ad',
    icon: 'ad'
  }
];
