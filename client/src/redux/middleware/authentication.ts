import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, destroy } from '../../libs/client/apiClient';

const getOrganization = createAsyncThunk('organization/get', async ({ id }: { id: string }) => {
  try {
    const { data } = await get(`/org/id`);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const startVerification = createAsyncThunk(
  'auth/startVerification',
  async ({ email, type }: { email: string; type: 'email' | 'password' }) => {
    try {
      const { data } = await post('/auth/start-verification', { email, type });
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

const login = createAsyncThunk('aut/login', async ({ email, password }: { email: string; password: string }) => {
  try {
    const { data } = await post('/auth/login', { email, password });
    return data.data;
  } catch (error) {
    throw error;
  }
});

const register = createAsyncThunk('auth/register', async ({ name, email, password }: { name: string; email: string; password: string }) => {
  try {
    const { data } = await post('/auth/register', { name, email, password });
    return data.data;
  } catch (error) {
    throw error;
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
    throw error;
  }
});

const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ code, email }: { code: string; email: string }) => {
  try {
    const { data } = await post('/auth/reset-password', { code, email });
    return data.data;
  } catch (error) {
    throw error;
  }
});

const verifyCode = createAsyncThunk('auth/verifyCode', async ({ code, email }: { code: string; email: string }) => {
  try {
    const { data } = await post('/auth/verify', { code, email });
    return data.data;
  } catch (error) {
    throw error;
  }
});

const completeVerification = createAsyncThunk('auth/completeVerification', async ({ code, email }: { code: string; email: string }) => {
  try {
    const { data } = await put('/auth/complete-verification', { code, email });
    return data.data;
  } catch (error) {
    throw error;
  }
});

export { getOrganization, startVerification, login, register, logout, forgotPassword, verifyCode, completeVerification };
