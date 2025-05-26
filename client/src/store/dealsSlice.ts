import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseURL } from '../apiConfig'

export interface Deal {
  id: string
  name: string
}

interface DealsState {
  items: Deal[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: DealsState = {
  items: [],
  status: 'idle'
}

export const fetchDeals = createAsyncThunk('deals/fetch', async () => {
  const res = await fetch(`${baseURL}/deals`)
  if (!res.ok) throw new Error('Failed to load deals')
  const data = await res.json()
  return data.data as Deal[]
})

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDeals.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items = action.payload
      })
      .addCase(fetchDeals.rejected, state => {
        state.status = 'failed'
      })
  }
})

export default dealsSlice.reducer
