import { createSlice } from '@reduxjs/toolkit';
import { CategoryResponseTypes, CategoryTypes } from '../../types';
import { getCategories, getCategory } from '../middleware/category';

const initialState: { data: CategoryTypes[]; loading: boolean; error: any } = {
  loading: false,
  data: [],
  error: null
};

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default categorySlice.reducer;
export const categorySelector = (state) => state.category.data;
