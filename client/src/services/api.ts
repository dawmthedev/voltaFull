import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../apiConfig';

export interface PayrollRecord {
  _id: string;
  projectId: string | { homeowner: string };
  technicianId: string | { name: string };
  percentage: number;
  amountDue: number;
  paid: boolean;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/rest` }),
  tagTypes: ['Payroll'],
  endpoints: (builder) => ({
    getAllPayroll: builder.query<PayrollRecord[], void>({
      query: () => '/payroll',
      transformResponse: (res: { data: PayrollRecord[] }) => res.data.map((r: any) => ({
        _id: r._id,
        project: (r.projectId as any).homeowner,
        technician: (r.technicianId as any).name,
        allocationPct: r.percentage,
        amountDue: r.amountDue,
        paid: r.paid,
      })),
    }),
    addPayroll: builder.mutation<void, { projectId: string; payroll: { technicianId: string; percentage: number }[] }>({
      query: ({ projectId, payroll }) => ({
        url: `/projects/${projectId}/payroll`,
        method: 'POST',
        body: { payroll },
      }),
      invalidatesTags: ['Payroll'],
    }),
  }),
});

export const { useGetAllPayrollQuery, useAddPayrollMutation } = api;
