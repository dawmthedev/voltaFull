import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../apiConfig";

export interface PayrollRecord {
  _id: string;
  projectId: string;
  technicianId: string;
  projectName: string;
  projectStage: string;
  technicianName: string;
  percentage: number;
  amountDue: number;
  paid: boolean;
}

interface PayrollResponse {
  _id: string;
  projectId: {
    _id: string;
    homeownerName: string;
    currentStage: string;
  };
  technicianId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  percentage: number;
  amountDue: number;
  paid: boolean;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/rest` }),
  tagTypes: ["Payroll"],
  endpoints: (builder) => ({
    getAllPayroll: builder.query<PayrollRecord[], void>({
      query: () => "/projects/payroll/list",
      providesTags: ["Payroll"],
      transformResponse: (res: { data: PayrollRecord[] }) => res.data,
    }),
    addPayroll: builder.mutation<
      void,
      {
        projectId: string;
        payroll: { technicianId: string; percentage: number }[];
      }
    >({
      query: ({ projectId, payroll }) => ({
        url: `/projects/${projectId}/payroll`,
        method: "POST",
        body: { payroll },
      }),
      invalidatesTags: ["Payroll"],
    }),
  }),
});

export const { useGetAllPayrollQuery, useAddPayrollMutation } = api;
