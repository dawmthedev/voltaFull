import { Box, Checkbox, Dialog, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import CustomInput from '../input/CustomInput';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
// import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { PlannerState } from '../calendar/Calendar';
import { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AvailabilityPlanState } from '../calendar/WeekCalender';
import moment from 'moment';

interface PlannerProps {
  state?: PlannerState;
  timeSlot?: AvailabilityPlanState;
  error?: { title: string; description: string };
  getFormData?: ({ name, value }: { name: string; value: string | Dayjs }) => void;
  unavailable: boolean;
}

const PlannerForm = ({ timeSlot, state, error, getFormData, unavailable }: PlannerProps) => {
  const startDateHandler = (newValue) => {
    getFormData({ name: 'startDate', value: newValue });
    timeSlot.startDate = newValue;
  };
  const endDateHandler = (newValue) => {
    getFormData({ name: 'endDate', value: newValue });
    timeSlot.endDate = newValue;
  };
  return (
    <Box>
      {!unavailable && (
        <>
          <CustomInput
            label="Title"
            name={'title'}
            onChange={(e) => getFormData({ name: e.target.name, value: e.target.value })}
            value={state.title}
            error={error.title}
          />
          <CustomInput
            label="Description"
            name={'description'}
            onChange={(e) => getFormData({ name: e.target.name, value: e.target.value })}
            value={state.description}
            error={error.description}
          />
          <Box mt={1.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker', 'DatePicker', 'TimeClock']}>
                <DatePicker
                  label="Start Event"
                  value={state.startDate}
                  onChange={(newValue) => getFormData({ name: 'startDate', value: newValue })}
                />
                <DatePicker
                  label="Close Event"
                  value={state.endDate}
                  onChange={(newValue) => getFormData({ name: 'endDate', value: newValue })}
                />
                <Box alignItems={'center'}>
                  <TimeClock
                    ampm
                    ampmInClock
                    value={state.timeOfExecution}
                    onChange={(newValue) => getFormData({ name: 'timeOfExecution', value: newValue })}
                  />
                </Box>
                {/* <MultiSectionDigitalClock
              value={state.timeOfExecution}
              onChange={(newValue) => getFormData({ name: 'timeOfExecution', value: newValue })}
              /> */}
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </>
      )}
      {unavailable && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker label="Start Time" value={timeSlot.startDate} onChange={(newValue) => startDateHandler(newValue)} />
            <TimePicker label="End Time" value={timeSlot.endDate} onChange={(newValue) => endDateHandler(newValue)} />
          </DemoContainer>
        </LocalizationProvider>
      )}
    </Box>
  );
};

export default PlannerForm;
