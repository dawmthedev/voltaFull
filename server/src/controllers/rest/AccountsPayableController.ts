import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams, QueryParams } from "@tsed/common";
import { Get, Post, Patch, Returns } from "@tsed/schema";
import { AccountsPayableService } from "../../services/AccountsPayableService";
import { AccountsPayableModel } from "../../models/AccountsPayableModel";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";

@Controller("/accounts-payable")
export class AccountsPayableController {
  @Inject()
  private service: AccountsPayableService;

  @Get()
  @(Returns(200, SuccessArrayResult).Of(AccountsPayableModel))
  async list(@QueryParams("paid") paid: string = "false") {
    const results = await this.service.listByPaidStatus(paid === "true");
    return new SuccessArrayResult(results, AccountsPayableModel);
  }

  @Post("/projects/:projectId")
  @(Returns(200, SuccessArrayResult).Of(AccountsPayableModel))
  async upsert(
    @PathParams("projectId") projectId: string,
    @BodyParams("allocations") allocations: { technicianId: string; percentage: number }[]
  ) {
    const res = await this.service.upsertAllocations(projectId, allocations);
    return new SuccessArrayResult(res, AccountsPayableModel);
  }

  @Patch(":id/pay")
  @(Returns(200, SuccessResult).Of(AccountsPayableModel))
  async markPaid(@PathParams("id") id: string) {
    const result = await this.service.markPaid(id);
    return new SuccessResult(result, AccountsPayableModel);
  }
}
