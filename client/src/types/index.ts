export interface PayrollRecord {
  _id: string;
  projectId: string;
  technicianId: string;
  percentage: number;
  amountDue: number;
  paid: boolean;
  // For display purposes
  projectName?: string;
  technicianName?: string;
}
