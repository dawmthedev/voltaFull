import { Controller, Inject } from "@tsed/di";
import { Context, QueryParams } from "@tsed/platform-params";
import { Get, Required, Returns } from "@tsed/schema";
import { AdminService } from "../../services/AdminService";
import { OrganizationResultModel } from "../../models/RestModels";
import { OrganizationService } from "../../services/OrganizationService";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";

@Controller("/org")
export class OrganizationController {
  @Inject()
  private organizationService: OrganizationService;

  @Inject()
  private adminService: AdminService;

  @Get("/")
  @(Returns(200, SuccessArrayResult).Of(OrganizationResultModel))
  public async getOrgs() {
    const orgs = await this.organizationService.findOrganizations();
    const response = {
      orgs: orgs.map((org) => {
        return {
          id: org.id,
          name: org.name,
          email: org.email,
          createdAt: org.createdAt,
          updatedAt: org.updatedAt
        };
      })
    };
    return new SuccessArrayResult(response.orgs, OrganizationResultModel);
  }

  @Get("/id")
  @(Returns(200, SuccessResult).Of(OrganizationResultModel))
  public async getOrg(@Required() query: { id: string }) {
    const org = await this.organizationService.findOrganizationById(query.id);
    return new SuccessResult(org, Object);
  }
}
