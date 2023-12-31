import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../libs/client/apiClient';
import {AvailabilityDataTypes} from '../../types';
import { setAlert } from '../slice/alertSlice';

const getAvailability = createAsyncThunk('availability/get', async ({ signal }: { signal: AbortSignal }, { dispatch }) => {
  try {
    const { data } = await get('/availability', { signal });
    return data.data;
  } catch (error) {
    const { message } = error.response.data;
    dispatch(setAlert({ message, type: 'error' }));
    throw error;
  }
});

const createAvailability = createAsyncThunk('availability/create', async ({ availability }: { availability: AvailabilityDataTypes }, { dispatch }) => {
  try {
    const { data } = await post('/availability', availability);
    dispatch(setAlert({ message: 'Unavailability scheduled successfully', type: 'success' }));
    return data.data;
  } catch (error) {
    const { message } = error.response.data;
    dispatch(setAlert({ message, type: 'error' }));
    throw error;
  }
});

export { getAvailability, createAvailability };
