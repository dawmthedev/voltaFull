import { createSlice } from '@reduxjs/toolkit';

// error slice
const initialState = {
  error: null,
  success: null,
  loading: false
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    }
  }
});

export const { setError, setSuccess } = errorSlice.actions;
export default errorSlice.reducer;
export const errorSelector = (state) => state.error.error;
export const loadingSelector = (state) => state.error.loading;
export const successSelector = (state) => state.error.success;
