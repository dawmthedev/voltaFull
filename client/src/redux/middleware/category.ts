import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, destroy } from '../../libs/client/apiClient';
import { CategoryTypes, FieldTypes } from '../../types';

const getCategories = createAsyncThunk('category/all/get', async ({ signal }: { signal: AbortSignal }) => {
  try {
    const { data } = await get('/category', { signal });
    return data.data;
  } catch (error) {
    throw error;
  }
});

const getCategory = createAsyncThunk('category/get', async({ id, signal }: { id: string ; signal: AbortSignal }) => {
  try {
    const { data } = await get(`/category/${id}`);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const createCategory = createAsyncThunk(
  'category/create',
  async ({
    category, signal
  }: {
    category: {
      name: string;
      description?: string;
      fields: FieldTypes[];
    }; 
    signal: AbortSignal
  }) => {
    try {
      const { data } = await post('/category', category);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateCategory = createAsyncThunk('category/update', async ({ category }: { category: CategoryTypes & { id: string } }) => {
  try {
    const { data } = await put('/category', category);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const deleteCategory = createAsyncThunk('category/delete', async ({ id }: { id: string }) => {
  try {
    const { data } = await destroy(`/category/${id}`);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const addNewColumn = createAsyncThunk('category/addNewColumn', async ({ tableId, fields }: { tableId: string; fields: FieldTypes[] }) => {
  try {
    const { data } = await post(`/category/new-column`, {
      tableId,
      fields
    });
    return data.data;
  } catch (error) {
    throw error;
  }
});

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory, addNewColumn };
