import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../libs/client/apiClient';
import { PlannerDataTypes } from '../../types';
import { setAlert } from '../slice/alertSlice';

const getPlanners = createAsyncThunk('planner/get', async ({ signal }: { signal: AbortSignal }) => {
  try {
    const { data } = await get('/planner', { signal });
    return data.data;
  } catch (error) {
    throw error;
  }
});

const createPlanner = createAsyncThunk('planner/create', async ({ planner }: { planner: PlannerDataTypes }, { dispatch }) => {
  try {
    const { data } = await post('/planner', planner);
    dispatch(setAlert({ message: 'Planner created successfully', type: 'success' }));
    return data.data;
  } catch (error) {
    const { message } = error.response.data;
    dispatch(setAlert({ message, type: 'error' }));
    throw error;
  }
});

export { getPlanners, createPlanner };
