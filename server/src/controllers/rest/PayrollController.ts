import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/common";
import { Get, Patch, Post, Returns } from "@tsed/schema";
import { PayrollService } from "../../services/PayrollService";
import { PayrollModel } from "../../models/PayrollModel";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";

@Controller("/")
export class PayrollController {
  @Inject()
  private service: PayrollService;

  @Post("/projects/:projectId/payroll")
  @(Returns(200, SuccessArrayResult).Of(PayrollModel))
  async create(
    @PathParams("projectId") projectId: string,
    @BodyParams("payroll") payroll: { technicianId: string; percentage: number }[]
  ) {
    const res = await this.service.insert(projectId, payroll);
    return new SuccessArrayResult(res, PayrollModel);
  }

  @Get("/projects/:projectId/payroll")
  @(Returns(200, SuccessArrayResult).Of(PayrollModel))
  async listForProject(@PathParams("projectId") projectId: string) {
    const res = await this.service.listForProject(projectId);
    return new SuccessArrayResult(res, PayrollModel);
  }

  @Get("/payroll")
  @(Returns(200, SuccessArrayResult).Of(PayrollModel))
  async listAll() {
    const res = await this.service.listAll();
    return new SuccessArrayResult(res, PayrollModel);
  }

  @Patch("/payroll/:payrollId/paid")
  @(Returns(200, SuccessResult).Of(PayrollModel))
  async markPaid(@PathParams("payrollId") payrollId: string) {
    const res = await this.service.markPaid(payrollId);
    return new SuccessResult(res, PayrollModel);
  }
}
