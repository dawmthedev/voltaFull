import { Box } from '@mui/material';
import React from 'react';
import CustomInput from '../input/CustomInput';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
// import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { PlannerState } from '../calendar/Calendar';
import { Dayjs } from 'dayjs';

interface PlannerProps {
  state: PlannerState;
  getFormData: ({ name, value }: { name: string; value: string | Dayjs }) => void;
}

const PlannerForm = ({ state, getFormData }: PlannerProps) => {
  return (
    <Box>
      <CustomInput
        label="Title"
        name={'title'}
        onChange={(e) => getFormData({ name: e.target.name, value: e.target.value })}
        value={state.title}
      />
      <CustomInput
        label="Description"
        name={'description'}
        onChange={(e) => getFormData({ name: e.target.name, value: e.target.value })}
        value={state.description}
      />
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
  );
};

export default PlannerForm;
