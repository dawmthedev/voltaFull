import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ProjectModel } from "../models/ProjectModel";
import { PayrollModel } from "../models/AccountsPayableModel";
import { AccountsPayableService } from "./AccountsPayableService";
import { ObjectId } from "mongodb";

export function parseCSV(content: string): Record<string, string>[] {
  const [headerLine, ...lines] = content.split(/\r?\n/).filter(Boolean);
  const headers = headerLine.split(",");
  return lines.map((line) => {
    const values = line.split(",");
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = values[i]?.trim() || "";
    });
    return obj;
  });
}

export function transformCSVToProject(row: Record<string, string>): Partial<ProjectModel> {
  return {
    homeowner: row["Homeowner"],
    saleDate: row["Sale Date"],
    products: row["Products"] ? row["Products"].split(";") : [],
    status: row["Solar Install - Status"] || row["Status"],
    stage: row["Stage"],
    contractAmount: parseFloat((row["Contract Amount Final"] || "").replace(/[^0-9.]/g, "")) || 0,
    systemSize: row["Final System Size (Watts)"] || row["Sold System Size (Watts)"],

    phone: row["Phone"],
    address: row["Address"],
    installer: row["Installer"],
    utilityCompany: row["Utility Company Text"],
    salesRep: row["Sales Rep"],
    projectManager: row["Project Manager"],
    financing: row["Financing"],
    source: row["Source"],
    ahj: row["AHJ"],
    qcStatus: row["QC Check - Status"],
    ptoStatus: row["PTO - Status"],
    // assignedTo: row["email1"]?.toLowerCase() || null,
    duration: row["Project Duration"]
  };
}

@Injectable()
export class ProjectService {
  constructor(
    @Inject(ProjectModel) private projectModel: MongooseModel<ProjectModel>,
    @Inject(PayrollModel) private payableModel: MongooseModel<PayrollModel>,
    @Inject(AccountsPayableService) public payableModelService: AccountsPayableService
  ) {}

  public async createProject(data: Partial<ProjectModel>) {
    return await this.projectModel.create(data);
  }

  public async getProjects(page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([this.projectModel.find().skip(skip).limit(pageSize), this.projectModel.countDocuments()]);
    return { items, total };
  }

  public async insertMany(data: Partial<ProjectModel>[]) {
    return await this.projectModel.insertMany(data);
  }

  public async findById(id: string) {
    return this.projectModel.findById(id).lean();
  }

  public async updateProject(id: string, data: Partial<ProjectModel>) {
    return this.projectModel.findByIdAndUpdate(id, data, { new: true });
  }

  public async getPayroll(projectId: string) {
    return this.payableModel.find({ projectId }).lean().exec();
  }

  public async updatePayroll(
    projectId: string,
    entries: {
      technicianId: string;
      technicianName: string;
      projectName: string;
      percentage: number;
      paid?: boolean;
    }[]
  ) {
    const project = await this.projectModel.findById(projectId).lean();
    if (!project) {
      throw new Error("Project not found");
    }

    // Ensure project has a homeowner name
    if (!project.homeowner) {
      throw new Error("Project homeowner name is required");
    }

    const results = [];
    for (const entry of entries) {
      // Validate required fields
      if (!entry.technicianName) {
        throw new Error(`Technician name is required for technician ID: ${entry.technicianId}`);
      }

      const amountDue = (project.contractAmount || 0) * (entry.percentage / 100);

      const payrollRecord = {
        projectId,
        technicianId: entry.technicianId,
        technicianName: entry.technicianName,
        projectName: project.homeowner,
        percentage: entry.percentage,
        amountDue,
        paid: entry.paid || false
      };

      const record = await this.payableModel.findOneAndUpdate({ projectId, technicianId: entry.technicianId }, payrollRecord, {
        upsert: true,
        new: true
      });
      results.push(record);
    }
    return results;
  }

  async getPayrollWithDetails() {
    const payroll = await this.payableModel
      .aggregate([
        {
          $lookup: {
            from: "projects",
            localField: "projectId",
            foreignField: "_id",
            as: "projectId"
          }
        },
        { $unwind: { path: "$projectId", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "users",
            localField: "technicianId",
            foreignField: "_id",
            as: "technicianId"
          }
        },
        { $unwind: { path: "$technicianId", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            percentage: 1,
            amountDue: 1,
            paid: 1,
            projectId: {
              _id: "$projectId._id",
              homeownerName: "$projectId.homeowner",
              currentStage: "$projectId.stage"
            },
            technicianId: {
              _id: "$technicianId._id",
              firstName: { $arrayElemAt: [{ $split: ["$technicianId.name", " "] }, 0] },
              lastName: {
                $arrayElemAt: [{ $split: ["$technicianId.name", " "] }, 1]
              }
            }
          }
        }
      ])
      .exec();

    return payroll;
  }
}
