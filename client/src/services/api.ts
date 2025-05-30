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

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/rest` }),
  tagTypes: ["Payroll"],
  endpoints: (builder) => ({
    getAllPayroll: builder.query<PayrollRecord[], void>({
      query: () => "/payroll",
      providesTags: ["Payroll"],
      transformResponse: (res: { data: any[] }) =>
        res.data.map((r) => ({
          _id: r._id,
          projectId: r.projectId._id,
          projectName: r.projectName,
          projectStage: r.projectStage,
          technicianId: r.technicianId._id,
          technicianName: r.technicianName,
          percentage: r.percentage,
          amountDue: r.amountDue,
          paid: r.paid,
        })),
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
