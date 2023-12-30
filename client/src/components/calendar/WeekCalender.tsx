import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CustomModal from '../modals/CustomModal';
import PlannerForm from '../planner-form/PlannerForm';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { createPlanner, getPlanners } from '../../redux/middleware/planner';
import { plannerSelector } from '../../redux/slice/plannerSlice';
import createAbortController from '../../utils/createAbortController';

interface CalendarProps {
  value: string;
  getActionData: (value: string, name: string) => void;
}

export type AvailabilityPlanState = {
  events: Array<any>;
  startDate: string;
  endDate: string;
  openSlot: boolean;
  openEvent: boolean;
  clickedEvent: object;
};

const initialState: AvailabilityPlanState = {
  events: [],
  startDate: '',
  endDate: '',
  openSlot: false,
  openEvent: false,
  clickedEvent: {}
};

const localizer = momentLocalizer(moment);

const WeekCalender = ({ value, getActionData }: CalendarProps) => {
  const dispatch = useAppDispatch();
  const { data: plannerData, events } = useAppSelector(plannerSelector);
  const { signal, abort } = createAbortController();
  const [addFormValues, setAddFormValues] = React.useState<AvailabilityPlanState>(initialState);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = React.useState<{ title: string; description: string }>({
    title: '',
    description: ''
  });

  useEffect(() => {
    (async () => {
      await dispatch(getPlanners({ signal }));
    })();

    return () => {
      abort();
    };
  }, []);

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6)
    }),
    []
  );

  const handleClose = () => {
    setAddFormValues({
      ...addFormValues,
      openEvent: false,
      openSlot: false
    });
  };
  const handleSelectedSlot = useCallback(({ start, end, box, nativeEvent }) => {
    const boundingBox = box;
    setSelectedSlot({ start, end, boundingBox });
    setDropdownVisible(true);
    setAddFormValues({ ...addFormValues, startDate: start, endDate: end, openSlot: true });
  }, []);

  const setNewAppointment = () => {
    const { startDate, endDate } = addFormValues;
    let unavailability = { startDate, endDate };
    let events = addFormValues.events.slice();
    events.push(unavailability);
    // localStorage.setItem("cachedEvents", JSON.stringify(events));
    setAddFormValues({ ...addFormValues, events: events });
  };

  const updateEvent = () => {
    const { startDate, endDate, events, clickedEvent } = addFormValues;
    const index = events.findIndex((event) => event === clickedEvent);
    const updatedEvent = events.slice();
    updatedEvent[index].startDate = startDate;
    updatedEvent[index].endDate = endDate;
    setAddFormValues({
      ...addFormValues,
      events: updatedEvent
    });
  };
  //  filters out specific event that is to be deleted and set that variable to state
  const deleteEvent = () => {
    const { startDate, endDate, events, clickedEvent } = addFormValues;
    let updatedEvents = events.filter((event) => event['startDte'] !== startDate);
    // localStorage.setItem("cachedEvents", JSON.stringify(updatedEvents));
    setAddFormValues({
      ...addFormValues,
      events: updatedEvents
    });
  };
  //const handleSelectEvent = useCallback((event) => window.alert(event.title), []);
  const handleSelectedEvent = useCallback((event) => {
    setAddFormValues({
      ...addFormValues,
      openEvent: true,
      clickedEvent: event,
      startDate: event.start,
      endDate: event.end
    });
  }, []);

  const closeDropdown = () => {
    // Close the dropdown
    setDropdownVisible(false);
  };

  const handleDropdownAction = (value) => {
    // Handle the action when an item in the dropdown is selected
    // For example, you can perform some action and then close the dropdown
    setIsModalOpen(true);
    closeDropdown();
  };

  //! submit planner form
  const submitPlan = async () => {
    const data = {
      startDate: addFormValues.startDate.toString(),
      endDate: addFormValues.endDate.toString()
    };
    await dispatch(createPlanner({ planner: data }));
    setIsModalOpen(false);
    await dispatch(getPlanners({ signal }));
  };
  //! Dropdown
  const renderDropdown = () => {
    if (!selectedSlot || !selectedSlot.boundingBox) {
      return null;
    }

    const { x, y } = selectedSlot.boundingBox;
    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: y,
      left: x,
      backgroundColor: 'white',
      boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 4
    };
    const itemStyle: React.CSSProperties = {
      fontWeight: 700,
      fontSize: '14px',
      fontFamily: 'math'
    };

    const getIcon = (value) => {
      switch (value) {
        case 'availability':
          return <EventBusyIcon fontSize={'small'} htmlColor="#676666" />;
        default:
          return null;
      }
    };

    return (
      <div style={dropdownStyle}>
        {ACTIONS.map((action: ActionTypes) => (
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              padding: '4px 0',
              cursor: action.value === 'availability' ? 'pointer' : 'no-drop'
            }}
            onClick={() => {
              action.value === 'availability' && handleDropdownAction(action.value);
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>{getIcon(action.value)}</div>
            <div
              style={{
                ...itemStyle,
                color: action.value === 'availability' ? '#676666' : '#bdbdbd',
                marginTop: '2px'
              }}
            >
              {action.name}
            </div>
          </div>
        ))}
      </div>
    );
  };
  const dayPropGetter = useCallback(
    (date) => ({
      ...(moment(date).day() === 2 && {
        className: 'tuesday'
      }),
      ...(moment(date).day() === 4 && {
        style: {
          backgroundColor: 'grey',
          color: 'white'
        }
      })
    }),
    []
  );
  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 60
      }
    }),
    []
  );

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Mark Unavailability
        </Button>
      </Box>
      <Calendar
        localizer={localizer}
        events={events}
        timeslots={4}
        startAccessor="start"
        endAccessor="end"
        defaultDate={defaultDate}
        views={['week']}
        defaultView={Views.WEEK}
        dayPropGetter={dayPropGetter}
        slotGroupPropGetter={slotGroupPropGetter}
        style={{ height: 500 }}
        dayLayoutAlgorithm="no-overlap"
        selectable={true}
        onSelectEvent={(event) => handleSelectedEvent(event)}
        onSelectSlot={(slotInfo) => handleSelectedSlot(slotInfo)}
        scrollToTime={scrollToTime}
      />
      {dropdownVisible && renderDropdown()}

      <CustomModal
        title={`Do you want to mark this Time Slot on ${moment(addFormValues.startDate).format('MMMM Do YYYY')} as Unavailable? `}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        handleSubmit={submitPlan}
      >
        <PlannerForm
          timeSlot={addFormValues}
          getFormData={({ name, value }) => {
            setAddFormValues({ ...addFormValues, [name]: value });
          }}
          unavailable={true}
        />
      </CustomModal>
    </Box>
  );
};

export default WeekCalender;

type ActionTypes = {
  id: number;
  name: string;
  value: string;
};

const ACTIONS: ActionTypes[] = [
  {
    id: 1,
    name: 'Schedule Unvaiability',
    value: 'availability'
  }
];
