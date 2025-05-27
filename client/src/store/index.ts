import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import dealsReducer from './dealsSlice'
import projectsReducer from './projectsSlice'
import usersReducer from './usersSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deals: dealsReducer,
    projects: projectsReducer,
    users: usersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
