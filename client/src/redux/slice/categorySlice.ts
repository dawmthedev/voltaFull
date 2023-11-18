import { createSlice } from '@reduxjs/toolkit';
import { CategoryResponseTypes, CategoryTypes } from '../../types';
import { getCategories, getCategory, addNewColumn } from '../middleware/category';

const initialState: { data: CategoryResponseTypes[]; loading: boolean; error: any; category: CategoryResponseTypes } = {
  loading: false,
  data: [],
  category: null,
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
    // get category by id
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // add new column
    builder.addCase(addNewColumn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewColumn.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(addNewColumn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default categorySlice.reducer;
export const categorySelector = (state) => state.category.data;
export const categoryByIdSelector = (state) => state.category.category;
export const loadingCategory = (state) => state.category.loading;