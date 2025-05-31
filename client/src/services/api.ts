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
      transformResponse: (res: { data: PayrollResponse[] }) =>
        res.data.map((p) => ({
          _id: p._id,
          projectId: p.projectId?._id ?? "",
          technicianId: p.technicianId?._id ?? "",
          projectName: p.projectId?.homeownerName ?? "Project Not Found",
          projectStage: p.projectId?.currentStage ?? "Stage Unknown",
          technicianName: p.technicianId
            ? `${p.technicianId.firstName} ${p.technicianId.lastName}`
            : "Technician Not Found",
          percentage: p.percentage,
          amountDue: p.amountDue,
          paid: p.paid,
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
