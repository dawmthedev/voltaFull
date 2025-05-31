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
          projectId: r.projectId,
          projectName: r.projectId,
          projectStage: r.projectId,
          technicianId: r.technicianId,
          technicianName: r.technicianId,
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

// Backend population logic
const Payroll = require('../models/payroll');

const getAllPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.aggregate([
      {
        $lookup: {
          from: 'projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'project'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'technicianId',
          foreignField: '_id',
          as: 'technician'
        }
      },
      {
        $unwind: '$project'
      },
      {
        $unwind: '$technician'
      },
      {
        $project: {
          _id: 1,
          projectId: '$project._id',
          projectName: '$project.homeownerName',
          projectStage: '$project.currentStage',
          technicianId: '$technician._id',
          technicianName: {
            $concat: ['$technician.firstName', ' ', '$technician.lastName']
          },
          percentage: 1,
          amountDue: 1,
          paid: 1
        }
      }
    ]).exec();

    console.log('Aggregated payroll:', JSON.stringify(payroll, null, 2));
    res.json({ data: payroll });
  } catch (error) {
    console.error('Payroll fetch error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPayroll,
};