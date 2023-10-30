import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../middleware/admin';

const initialState = {
  loading: false,
  data: [],
  error: null
};

const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.loading = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default adminSlice.reducer;
export const adminSelector = (state) => state.admin.data;
