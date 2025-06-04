import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductTemplate, ProjectProduct, EventStatus } from '../types/task';
import { apiConfig } from '../config/apiConfig';

export const productTemplateApi = createApi({
  reducerPath: 'productTemplateApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: apiConfig.baseURL,
    credentials: 'include' // Include cookies for authentication
  }),
  tagTypes: ['ProductTemplate', 'ProjectProduct'],
  endpoints: (builder) => ({
    getPublishedTemplates: builder.query<ProductTemplate[], void>({
      query: () => '/api/product-templates?published=true',
      providesTags: ['ProductTemplate']
    }),
    getAllTemplates: builder.query<ProductTemplate[], void>({
      query: () => '/api/product-templates',
      providesTags: ['ProductTemplate']
    }),
    getTemplateById: builder.query<ProductTemplate, string>({
      query: (id) => `/api/product-templates/${id}`,
      providesTags: (result, error, id) => [{ type: 'ProductTemplate', id }]
    }),
    addProductToProject: builder.mutation<ProjectProduct, { projectId: string, templateId: string }>({
      query: ({ projectId, templateId }) => ({
        url: '/api/project-products',
        method: 'POST',
        body: { projectId, productTemplateId: templateId }
      }),
      invalidatesTags: ['ProjectProduct']
    }),
    getProjectProducts: builder.query<ProjectProduct[], string>({
      query: (projectId) => `/api/projects/${projectId}/products`,
      providesTags: ['ProjectProduct']
    }),
    updateEventStatus: builder.mutation<void, { 
      projectProductId: string, 
      eventId: string, 
      statusId: string 
    }>({
      query: ({ projectProductId, eventId, statusId }) => ({
        url: `/api/project-products/${projectProductId}/events/${eventId}/status`,
        method: 'POST',
        body: { statusId }
      }),
      invalidatesTags: ['ProjectProduct']
    })
  })
});

export const {
  useGetPublishedTemplatesQuery,
  useGetAllTemplatesQuery,
  useGetTemplateByIdQuery,
  useAddProductToProjectMutation,
  useGetProjectProductsQuery,
  useUpdateEventStatusMutation
} = productTemplateApi;
