import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { PayrollModel } from "../models/PayrollModel";
import { ProjectModel } from "../models/ProjectModel";
import { AdminModel } from "../models/AdminModel";

interface PayrollEntry {
  technicianId: string;
  percentage: number;
  amountDue: number;
}

@Injectable()
export class PayrollService {
  constructor(
    @Inject(PayrollModel) private payrollModel: MongooseModel<PayrollModel>,
    @Inject(ProjectModel) private projectModel: MongooseModel<ProjectModel>,
    @Inject(AdminModel) private adminModel: MongooseModel<AdminModel>
  ) {}

  async insert(projectId: string, entries: PayrollEntry[]) {
    const project = await this.projectModel.findById(projectId).lean();
    const contract = project?.contractAmount || 0;
    const projectName = project?.homeowner || "Unknown";

    const techIds = [...new Set(entries.map((e) => e.technicianId))];
    const technicians = await this.adminModel.find({ _id: { $in: techIds } }).lean();
    const techMap = new Map(technicians.map((t) => [t._id.toString(), t.name as string]));

    const results: PayrollModel[] = [];
    for (const entry of entries) {
      const amountDue = entry.amountDue || "Eror: Amount not provided";
      const technicianName = techMap.get(entry.technicianId) || "Unknown";
      const doc = await this.payrollModel.create({
        projectId,
        technicianId: entry.technicianId,
        technicianName,
        projectName,
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
    return this.payrollModel.findByIdAndUpdate(id, { paid: true, paidAt: new Date() }, { new: true });
  }
}
