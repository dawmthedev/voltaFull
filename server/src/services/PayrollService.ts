import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { PayrollModel } from "../models/PayrollModel";
import { ProjectModel } from "../models/ProjectModel";

interface PayrollEntry {
  technicianId: string;
  percentage: number;
}

@Injectable()
export class PayrollService {
  constructor(
    @Inject(PayrollModel) private payrollModel: MongooseModel<PayrollModel>,
    @Inject(ProjectModel) private projectModel: MongooseModel<ProjectModel>
  ) {}

  async insert(projectId: string, entries: PayrollEntry[]) {
    const project = await this.projectModel.findById(projectId).lean();
    const contract = project?.contractAmount || 0;
    const results: PayrollModel[] = [];
    for (const entry of entries) {
      const amountDue = (contract * entry.percentage) / 100;
      const doc = await this.payrollModel.create({
        projectId,
        technicianId: entry.technicianId,
        percentage: entry.percentage,
        amountDue,
        paid: false
      });
      results.push(doc);
    }
    return results;
  }

  async listForProject(projectId: string) {
    return this.payrollModel.find({ projectId }).lean();
  }

  async listAll() {
    return this.payrollModel.find().lean();
  }

  async markPaid(id: string) {
    return this.payrollModel.findByIdAndUpdate(
      id,
      { paid: true, paidAt: new Date() },
      { new: true }
    );
  }
}
