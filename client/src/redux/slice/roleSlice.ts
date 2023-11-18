import { createReducer, createSlice } from '@reduxjs/toolkit';
import { createRole, getRoles } from '../middleware/role';

const initialState = {
  loading: false,
  data: [],
  error: null
};

const roleSlice = createSlice({
  name: 'roleSlice',
  initialState,
  reducers: {
    getRoles: (state, action) => {
      state.loading = true;
    },
    createRole: (state, action) => {
      state.loading = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getRoles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //create role
    builder.addCase(createRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRole.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(createRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default roleSlice.reducer;
export const roleList = (state) => state.role.data;
export const loadingRole = (state) => state.role.loading;
