import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import projectsReducer from './projectsSlice'
import usersReducer from './usersSlice'
import accountsPayableReducer from './accountsPayableSlice'
import productTemplatesReducer, { productTemplatesApi } from './productTemplatesSlice'
import projectProductsReducer, { projectProductsApi } from './projectProductsSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { api } from '../services/api'
import { taskApi } from '../services/taskService'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    users: usersReducer,
    accountsPayable: accountsPayableReducer,
    productTemplates: productTemplatesReducer,
    projectProducts: projectProductsReducer,
    [api.reducerPath]: api.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [productTemplatesApi.reducerPath]: productTemplatesApi.reducer,
    [projectProductsApi.reducerPath]: projectProductsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware, 
      taskApi.middleware, 
      productTemplatesApi.middleware, 
      projectProductsApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
