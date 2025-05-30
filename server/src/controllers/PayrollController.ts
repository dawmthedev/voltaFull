import { Controller, Get } from "@tsed/common";
import { PayrollModel } from "../models/PayrollModel";
import { ProjectModel } from "../models/ProjectModel";
import { UserModel } from "../models/UserModel";

@Controller("/payroll")
export class PayrollController {
  @Get("/")
  async getAllPayroll() {
    const payrolls = await PayrollModel.find().lean();

    // Fetch related data in bulk
    const projectIds = [...new Set(payrolls.map((p) => p.projectId))];
    const techIds = [...new Set(payrolls.map((p) => p.technicianId))];

    const [projects, technicians] = await Promise.all([
      ProjectModel.find({ _id: { $in: projectIds } }).lean(),
      UserModel.find({ _id: { $in: techIds } }).lean()
    ]);

    // Create lookup maps
    const projectMap = new Map(projects.map((p) => [p._id.toString(), p]));
    const techMap = new Map(technicians.map((t) => [t._id.toString(), t]));

    // Enrich payroll data
    const enrichedPayrolls = payrolls.map((payroll) => ({
      ...payroll,
      projectName: projectMap.get(payroll.projectId)?.homeowner || "Unknown",
      projectStage: projectMap.get(payroll.projectId)?.stage || "Unknown",
      technicianName: techMap.get(payroll.technicianId)
        ? `${techMap.get(payroll.technicianId)?.firstName} ${techMap.get(payroll.technicianId)?.lastName}`
        : "Unknown"
    }));

    return { data: enrichedPayrolls };
  }
}
