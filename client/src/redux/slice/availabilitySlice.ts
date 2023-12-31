import { createSlice } from '@reduxjs/toolkit';
import { AvailabilityResponseTypes } from '../../types';
import { createAvailability, getAvailability } from '../middleware/availability';

const initialState: { data: AvailabilityResponseTypes[]; events: { startDate: Date; endDate: Date }[]; loading: boolean; error: any } = {
  loading: false,
  data: [],
  events: [],
  error: null
};

const availabilitySlice = createSlice({
  name: 'availabilitySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Planners
    builder.addCase(getAvailability.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAvailability.fulfilled, (state, action) => {
      state.data = action.payload;
      state.events = action.payload.items.map((availability) => {
        return {
          startDate: new Date(availability.startDate),
          endDate: new Date(availability.endDate)
        };
      });
    });
    builder.addCase(getAvailability.rejected, (state, action) => {
      state.error = action.error;
    });

    // Create Planner
    builder.addCase(createAvailability.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAvailability.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(createAvailability.rejected, (state, action) => {
      state.error = action.error;
    });
  }
});

export default availabilitySlice.reducer;
export const availabilitySelector = (state) => state.availability;
export const availabilityLoading = (state) => state.availability.loading;
