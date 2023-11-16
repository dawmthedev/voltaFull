import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, destroy } from '../../libs/client/apiClient';
import { RoleDataTypes } from '../../types';

const getRoles = createAsyncThunk('role/get', async ({ signal }: { signal: AbortSignal }) => {
  try {
    const { data } = await get('/role', { signal });
    return data.data;
  } catch (error) {
    throw error;
  }
});

const createRole = createAsyncThunk('role/create', async ({ role }: { role: string }) => {
  try {
    const { data } = await post('/role', {name : role});
    return data.data;
  } catch (error) {
    throw error;
  }
});


export { getRoles, createRole  };
