import { createSlice } from '@reduxjs/toolkit';
import { PlannerResponseTypes } from '../../types';
import { createPlanner, getPlanners } from '../middleware/planner';

const initialState: { data: PlannerResponseTypes[]; loading: boolean; error: any } = {
  loading: false,
  data: [],
  error: null
};

const plannerSlice = createSlice({
  name: 'plannerSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Planners
    builder.addCase(getPlanners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlanners.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getPlanners.rejected, (state, action) => {
      state.error = action.error;
    });

    // Create Planner
    builder.addCase(createPlanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPlanner.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(createPlanner.rejected, (state, action) => {
      state.error = action.error;
    });
  }
});

export default plannerSlice.reducer;
export const plannerSelector = (state) => state.planner.data;
