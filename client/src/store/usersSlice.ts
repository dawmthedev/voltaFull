import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseURL } from '../apiConfig'

export interface User {
  _id?: string
  name: string
  email: string
  role: string
  phone?: string
  isSuperAdmin?: boolean
  createdAt?: string
}

interface UsersState {
  items: User[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: UsersState = {
  items: [],
  status: 'idle'
}

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await fetch(`${baseURL}/users`)
  if (!res.ok) throw new Error('Failed to load users')
  const data = await res.json()
  return data.data as User[]
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed'
      })
  }
})

export default usersSlice.reducer
