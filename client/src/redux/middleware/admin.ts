import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, destroy } from '../../libs/client/apiClient';

const getUsers = createAsyncThunk('users/get', async ({ signal }: { signal: AbortSignal }) => {
  try {
    const { data } = await get('/admin', { signal });
    return data.data;
  } catch (error) {
    throw error;
  }
});

const updateAdmin = createAsyncThunk('users/update', async ({ id,  name,  role, isSuperAdmin }: { id: string; name: string; role: string; isSuperAdmin: boolean}) => {
  try {
    const { data } = await put('/admin' , { id,  name, role, isSuperAdmin});
    return data.data;
  } catch (error) {
    throw error;
  }
});

export { getUsers, updateAdmin };