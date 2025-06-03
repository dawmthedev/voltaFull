import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Task, Technician } from '../types/task';

// Create API slice for task management
export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }: any) => {
      // Get the token from the auth state
      const token = getState().auth.token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Products', 'Tasks', 'Technicians'],
  endpoints: (builder) => ({
    // Products endpoints
    getProjectProducts: builder.query<Product[], string>({
      query: (projectId) => `/projects/${projectId}/products`,
      providesTags: (result) => 
        result 
          ? [
              ...result.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: `/projects/${product.projectId}/products`,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg.id }],
    }),
    
    // Tasks endpoints
    getProductTasks: builder.query<Task[], string>({
      query: (productId) => `/products/${productId}/tasks`,
      providesTags: (result) => 
        result 
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    
    getProjectTasks: builder.query<Task[], string>({
      query: (projectId) => `/projects/${projectId}/tasks`,
      providesTags: (result) => 
        result 
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Tasks', id: arg.id }],
    }),
    
    assignTask: builder.mutation<Task, { taskId: string, technicianIds: string[] }>({
      query: ({ taskId, technicianIds }) => ({
        url: `/tasks/${taskId}/assign`,
        method: 'PUT',
        body: { technicianIds },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Tasks', id: arg.taskId }],
    }),
    
    updateTaskStatus: builder.mutation<Task, { taskId: string, status: string }>({
      query: ({ taskId, status }) => ({
        url: `/tasks/${taskId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Tasks', id: arg.taskId }],
    }),
    
    // Technicians endpoints
    getAvailableTechnicians: builder.query<Technician[], void>({
      query: () => '/technicians/available',
      providesTags: [{ type: 'Technicians', id: 'AVAILABLE' }],
    }),
    
    getAllTechnicians: builder.query<Technician[], void>({
      query: () => '/technicians',
      providesTags: (result) => 
        result 
          ? [
              ...result.map(({ id }) => ({ type: 'Technicians' as const, id })),
              { type: 'Technicians', id: 'LIST' },
            ]
          : [{ type: 'Technicians', id: 'LIST' }],
    }),
    
    getTechnicianLocation: builder.query<{ lat: number; lng: number; lastUpdated: Date }, string>({
      query: (technicianId) => `/technicians/${technicianId}/location`,
      providesTags: (result, error, technicianId) => [{ type: 'Technicians', id: technicianId }],
    }),
  }),
});

export const {
  useGetProjectProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductTasksQuery,
  useGetProjectTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useAssignTaskMutation,
  useUpdateTaskStatusMutation,
  useGetAvailableTechniciansQuery,
  useGetAllTechniciansQuery,
  useGetTechnicianLocationQuery,
} = taskApi;
