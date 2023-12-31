import { Controller, Inject } from "@tsed/di";
import { Enum, Get, Post, Property, Required, Returns } from "@tsed/schema";
import { AdminService } from "../../services/AdminService";
import { AvailabilityResultModel } from "../../models/RestModels";
import { Pagination, SuccessArrayResult, SuccessResult } from "../../util/entities";
import { ADMIN } from "../../util/constants";
import { BodyParams, Context } from "@tsed/platform-params";
import { Unauthorized } from "@tsed/exceptions";
import { ADMIN_NOT_FOUND, ORG_NOT_FOUND } from "../../util/errors";
import { AvailabilityService } from "../../services/AvailabilityService";
import { normalizeData } from "../../helper";

class AvailabilityBodyTypes {
  @Property() public readonly startDate: string;
  @Property() public readonly endDate: string;
}

@Controller("/availability")
export class PlannerController {
  @Inject() private adminService: AdminService;
  @Inject() private availabilityService: AvailabilityService;

  @Get()
  @Returns(200, SuccessArrayResult).Of(Pagination).Nested(AvailabilityResultModel)
  public async getPlanners(@Context() context: Context) {
    await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
    const planner = await this.availabilityService.findPlanner();
    const plannerData = normalizeData(planner);
    return new SuccessResult(new Pagination(plannerData, planner.length, AvailabilityResultModel), Pagination);
  }

  @Post()
  @Returns(200, SuccessResult).Of(AvailabilityResultModel)
  public async createPlanner(@BodyParams() body: AvailabilityBodyTypes, @Context() context: Context) {
    const { adminId } = await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
    if (!adminId) throw new Unauthorized(ADMIN_NOT_FOUND);
    const { startDate, endDate } = body;
    const response = await this.availabilityService.createAvailability({
      startDate,
      endDate,
      adminId
    });
    const result = {
      id: response._id,
      startDate: response.startDate.toString(),
      endDate: response.endDate.toString(),
      adminId: response.adminId
    };
    return new SuccessResult(result, AvailabilityResultModel);
  }
}
