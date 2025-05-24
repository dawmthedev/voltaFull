import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { get, post, put } from '../../libs/client/apiClient';

const SOMETHING_WENT_WRONG = 'Something went wrong!';

const getOrganization = createAsyncThunk('organization/get', async ({ id }: { id: string }) => {
  try {
    const { data } = await get(`/org/id`);
    return data.data;
  } catch (error) {
    throw new Error((error as AxiosError<any>).response?.data.message || SOMETHING_WENT_WRONG);
  }
});


const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  try {
    const { data } = await post('/auth/login', { email, password });
    return data.data;
  } catch (error) {
    throw new Error((error as AxiosError<any>).response?.data.message || SOMETHING_WENT_WRONG);
  }
});





const register = createAsyncThunk('auth/register', async ({ name, email, password }: { name: string; email: string; password: string }) => {
  try {
    const { data } = await post('/auth/register', { name, email, password });
    return data.data;
  } catch (error) {
    throw new Error((error as AxiosError<any>).response?.data.message || SOMETHING_WENT_WRONG);
  }
});

// const completeRegistration = createAsyncThunk(
//   'auth/completeRegistration',
//   async ({ name, email, password }: { name: string; email: string; password: string }) => {
//     try {
//       const { data } = await post('/auth/complete-registration', { name, email, password });
//       return data.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const { data } = await post('/auth/logout');
    return data.data;
  } catch (error) {
    throw new Error((error as AxiosError<any>).response?.data.message || SOMETHING_WENT_WRONG);
  }
});


export { getOrganization, login, register, logout };
