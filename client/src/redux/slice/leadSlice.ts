import { createSlice } from '@reduxjs/toolkit';
import { LeadsTypes } from '../../types';
import { getLead, getLeads, createLead, createBulkLead, updateLead, deleteLead } from '../middleware/lead';

const initialState: { data: LeadsTypes[]; loading: boolean; error: any } = {
  loading: false,
  data: [],
  error: null
};

const leadSlice = createSlice({
  name: 'leadSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Leads
    builder.addCase(getLeads.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLeads.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getLeads.rejected, (state, action) => {
      state.error = action.error;
    });

    // Get Lead
    builder.addCase(getLead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLead.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getLead.rejected, (state, action) => {
      state.error = action.error;
    });

    // Create Lead
    builder.addCase(createLead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createLead.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(createLead.rejected, (state, action) => {
      state.error = action.error;
    });

    // Create Bulk Lead
    builder.addCase(createBulkLead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBulkLead.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(createBulkLead.rejected, (state, action) => {
      state.error = action.error;
    });

    // Update Lead
    builder.addCase(updateLead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateLead.rejected, (state, action) => {
      state.error = action.error;
    });

    // Delete Lead
    builder.addCase(deleteLead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteLead.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteLead.rejected, (state, action) => {
      state.error = action.error;
    });
  }
});

export default leadSlice.reducer;
export const leadsList = (state) => state.lead.data;
