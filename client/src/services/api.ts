import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../apiConfig";

interface PayrollResponse {
  _id: string;
  projectId: string;
  technicianId: string;
  projectName: string;
  technicianName: string;
  projectStage: string;
  percentage: number;
  amountDue: number;
  paid: boolean;
}

export type PayrollRecord = PayrollResponse;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/rest` }),
  tagTypes: ["Payroll"],
  endpoints: (builder) => ({
    getAllPayroll: builder.query<PayrollRecord[], void>({
      query: () => "/payroll/list-details", // Updated endpoint URL
      providesTags: ["Payroll"],
      transformResponse: (res: { data: PayrollResponse[] }) => res.data,
    }),
    addPayroll: builder.mutation<
      void,
      {
        projectId: string;
        payroll: {
          technicianId: string;
          technicianName: string;
          projectName: string;
          percentage: number;
          // amountDue: number; // This is the calculated amount from the client
          amountDue: number; // This is the calculated amount from the client
          paid: boolean;
        }[];
      }
    >({
      query: (payload) => ({
        url: `/payroll/create`,
        method: "POST",
        body: payload, // Sends the exact payload to backend
      }),
      invalidatesTags: ["Payroll"],
    }),
  }),
});

export const { useGetAllPayrollQuery, useAddPayrollMutation } = api;

export const apiService = {
  updateUserRole: async (userId: string, role: string) => {
    const response = await fetch(`/rest/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update user");
    }

    return await response.json();
  },
};
