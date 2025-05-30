import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams, QueryParams } from "@tsed/common";
import { Get, Post, Patch, Returns } from "@tsed/schema";
import { AccountsPayableService } from "../../services/AccountsPayableService";
import { PayrollModel } from "../../models/AccountsPayableModel";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";

@Controller("/")
export class AccountsPayableController {
  @Inject()
  private service: AccountsPayableService;

  @Get("/accounts-payable")
  @(Returns(200, SuccessArrayResult).Of(PayrollModel))
  async list(@QueryParams("paid") paid: string = "false") {
    const results = await this.service.listByPaidStatus(paid === "true");
    return new SuccessArrayResult(results, PayrollModel);
  }

  @Post("/projects/:projectId/accounts-payable")
  @(Returns(200, SuccessArrayResult).Of(PayrollModel))
  async upsert(
    @PathParams("projectId") projectId: string,
    @BodyParams("allocations") allocations: { technicianId: string; percentage: number }[]
  ) {
    const res = await this.service.upsertAllocations(projectId, allocations);
    return new SuccessArrayResult(res, PayrollModel);
  }

  @Patch("/accounts-payable/:id/pay")
  @(Returns(200, SuccessResult).Of(PayrollModel))
  async markPaid(@PathParams("id") id: string) {
    const result = await this.service.markPaid(id);
    return new SuccessResult(result, PayrollModel);
  }
}
