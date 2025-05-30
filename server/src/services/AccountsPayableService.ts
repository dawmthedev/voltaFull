import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BadRequest } from "@tsed/exceptions";
import { AccountsPayableModel, PayrollModel } from "../models/AccountsPayableModel";
import { ProjectModel } from "../models/ProjectModel";

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
    private legacyModel: MongooseModel<AccountsPayableModel>
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

    const results: PayrollModel[] = [];
    for (const alloc of allocations) {
      const amountDue = (contract * alloc.percentage) / 100;
      const record = await this.payrollModel.findOneAndUpdate(
        { projectId, technicianId: alloc.technicianId },
        { projectId, technicianId: alloc.technicianId, percentage: alloc.percentage, amountDue },
        { upsert: true, new: true }
      );
      results.push(record);
    }
    return results;
  }

  public async listByPaidStatus(paid: boolean) {
    await this.ensureMigrated();
    return this.payrollModel
      .find({ paid })
      .populate("technicianId", "name")
      .populate("projectId", "homeowner");
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
      const projects = await this.payrollModel
        .find()
        .populate('technicianId', 'name')
        .populate('projectId', 'homeowner status');
    const map = new Map<string, any>();
    for (const rec of projects) {
      const pid = (rec.projectId as any)._id.toString();
      if (!map.has(pid)) {
        map.set(pid, {
          projectId: pid,
          projectName: (rec.projectId as any).homeowner,
          status: (rec.projectId as any).status,
          payroll: [] as any[],
        });
      }
      map.get(pid).payroll.push({
        techId: (rec.technicianId as any)._id.toString(),
        allocationPct: rec.percentage,
        paid: rec.paid,
        amountDue: rec.amountDue,
      });
    }
    return Array.from(map.values());
  }
}
