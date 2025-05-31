import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BadRequest } from "@tsed/exceptions";
import { AccountsPayableModel } from "../models/AccountsPayableModel";
import { PayrollModel } from "../models/PayrollModel";
import { ProjectModel } from "../models/ProjectModel";
import { AdminModel } from "../models/AdminModel";

interface AllocationInput {
  technicianId: string;
  percentage: number;
}

@Injectable()
export class AccountsPayableService {
  constructor(
    @Inject(PayrollModel)
    private payrollModel: MongooseModel<PayrollModel>,
    @Inject(ProjectModel)
    private projectModel: MongooseModel<ProjectModel>,
    @Inject(AccountsPayableModel)
    private legacyModel: MongooseModel<AccountsPayableModel>,
    @Inject(AdminModel)
    private adminModel: MongooseModel<AdminModel>
  ) {}

  private migrated = false;

  private async ensureMigrated() {
    if (this.migrated) return;
    const count = await this.payrollModel.countDocuments();
    if (count === 0) {
      const docs = await this.legacyModel.find().lean();
      if (docs.length) {
        await this.payrollModel.insertMany(
          docs.map(({ _id, ...d }) => d as any)
        );
      }
    }
    this.migrated = true;
  }

  public async upsertAllocations(projectId: string, allocations: AllocationInput[]) {
    await this.ensureMigrated();
    const total = allocations.reduce((sum, a) => sum + a.percentage, 0);
    if (total > 100) {
      throw new BadRequest("Total allocation percentage cannot exceed 100");
    }

    const project = await this.projectModel.findById(projectId).lean();
    const contract = project?.contractAmount || 0;
    const projectName = project?.homeowner || "Unknown";

    const techIds = [...new Set(allocations.map((a) => a.technicianId))];
    const technicians = await this.adminModel
      .find({ _id: { $in: techIds } })
      .lean();
    const techMap = new Map(
      technicians.map((t) => [t._id.toString(), t.name as string])
    );

    const results: PayrollModel[] = [];
    for (const alloc of allocations) {
      const amountDue = (contract * alloc.percentage) / 100;
      const technicianName = techMap.get(alloc.technicianId) || "Unknown";
      const record = await this.payrollModel.findOneAndUpdate(
        { projectId, technicianId: alloc.technicianId },
        {
          projectId,
          technicianId: alloc.technicianId,
          technicianName,
          projectName,
          percentage: alloc.percentage,
          amountDue,
        },
        { upsert: true, new: true }
      );
      results.push(record);
    }
    return results;
  }

  public async listByPaidStatus(paid: boolean) {
    await this.ensureMigrated();
    return this.payrollModel.find({ paid }).lean();
  }

  public async markPaid(id: string) {
    await this.ensureMigrated();
    return this.payrollModel.findByIdAndUpdate(
      id,
      { paid: true, paidAt: new Date() },
      { new: true }
    );
  }

  public async listAllByProject() {
    await this.ensureMigrated();
    const records = await this.payrollModel.find().lean();
    const projectIds = [...new Set(records.map((r) => r.projectId))];
    const projects = await this.projectModel
      .find({ _id: { $in: projectIds } })
      .lean();
    const projMap = new Map(
      projects.map((p) => [p._id.toString(), { name: p.homeowner, status: p.status }])
    );

    const map = new Map<string, any>();
    for (const rec of records) {
      const pid = rec.projectId.toString();
      if (!map.has(pid)) {
        const proj = projMap.get(pid) || { name: rec.projectName, status: undefined };
        map.set(pid, {
          projectId: pid,
          projectName: proj.name,
          status: proj.status,
          payroll: [] as any[],
        });
      }
      map.get(pid).payroll.push({
        techId: rec.technicianId,
        allocationPct: rec.percentage,
        paid: rec.paid,
        amountDue: rec.amountDue,
      });
    }
    return Array.from(map.values());
  }
}
