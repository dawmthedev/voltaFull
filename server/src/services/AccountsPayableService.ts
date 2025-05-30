import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BadRequest } from "@tsed/exceptions";
import { AccountsPayableModel } from "../models/AccountsPayableModel";
import { ProjectModel } from "../models/ProjectModel";

interface AllocationInput {
  technicianId: string;
  percentage: number;
}

@Injectable()
export class AccountsPayableService {
  constructor(
    @Inject(AccountsPayableModel)
    private payableModel: MongooseModel<AccountsPayableModel>,
    @Inject(ProjectModel)
    private projectModel: MongooseModel<ProjectModel>
  ) {}

  public async upsertAllocations(projectId: string, allocations: AllocationInput[]) {
    const total = allocations.reduce((sum, a) => sum + a.percentage, 0);
    if (total > 100) {
      throw new BadRequest("Total allocation percentage cannot exceed 100");
    }

    const project = await this.projectModel.findById(projectId).lean();
    const contract = project?.contractAmount || 0;

    const results: AccountsPayableModel[] = [];
    for (const alloc of allocations) {
      const amountDue = (contract * alloc.percentage) / 100;
      const record = await this.payableModel.findOneAndUpdate(
        { projectId, technicianId: alloc.technicianId },
        { projectId, technicianId: alloc.technicianId, percentage: alloc.percentage, amountDue },
        { upsert: true, new: true }
      );
      results.push(record);
    }
    return results;
  }

  public async listByPaidStatus(paid: boolean) {
    return this.payableModel
      .find({ paid })
      .populate("technicianId", "name")
      .populate("projectId", "homeowner");
  }

  public async markPaid(id: string) {
    return this.payableModel.findByIdAndUpdate(
      id,
      { paid: true, paidAt: new Date() },
      { new: true }
    );
  }

  public async listAllByProject() {
      const projects = await this.payableModel
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
