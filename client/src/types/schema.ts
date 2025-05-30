import { z } from "zod";

export const PayrollSchema = z.object({
  technicianId: z.string().min(1),
  percentage: z.number().min(0).max(100),
  amountDue: z.number().min(0),
  paid: z.boolean().default(false),
});

export const ProjectSchema = z.object({
  _id: z.string().optional(),
  homeowner: z.string().min(1),
  saleDate: z.string().optional(),
  products: z.array(z.string()).default([]),
  contractAmount: z.number().min(0).optional(),
  status: z.string().optional(),
  stage: z.string().optional(),
  piecemealPercent: z.number().min(0).max(100).optional(),
  payroll: z.array(PayrollSchema).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
