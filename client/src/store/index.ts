import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import projectsReducer from './projectsSlice'
import usersReducer from './usersSlice'
import accountsPayableReducer from './accountsPayableSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { api } from '../services/api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    users: usersReducer,
    accountsPayable: accountsPayableReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
