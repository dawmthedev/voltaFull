import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login as apiLogin } from '../api/auth'

interface AuthState {
  user: any | null
  token: string | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  status: 'idle'
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const data = await apiLogin(credentials)
    const token = data?.data?.token
    if (token) localStorage.setItem('authToken', token)
    return { user: data.data, token }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('authToken')
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, state => {
        state.status = 'failed'
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
