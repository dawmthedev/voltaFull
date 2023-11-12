import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Event 1',
    start: new Date(2023, 10, 15, 10, 0), // Year, Month (0-indexed), Day, Hour, Minute
    end: new Date(2023, 10, 15, 12, 0)
  }
  // Add more events as needed
];

const MyCalendar = (props) => (
  <div>
    <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
  </div>
);

export default MyCalendar;
