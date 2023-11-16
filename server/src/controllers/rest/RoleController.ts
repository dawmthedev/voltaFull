import { Controller, Inject } from "@tsed/di";
import { BodyParams, Context } from "@tsed/platform-params";
import { Get, Post, Required, Returns } from "@tsed/schema";
import { RoleResultModel } from "../../models/RestModels";
import { RoleService } from "../../services/RoleService";
import { AdminService } from "../../services/AdminService";
import { ADMIN, MANAGER } from "../../util/constants";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";

class RoleParams {
  @Required() public readonly name: string;
}

@Controller("/role")
export class RoleController {
  @Inject()
  private adminService: AdminService;
  @Inject()
  private roleService: RoleService;

  @Get()
  @Returns(200, SuccessArrayResult).Of(RoleResultModel)
  public async getRoles(@Context() context: Context) {
    await this.adminService.checkPermissions({ hasRole: [ADMIN, MANAGER] }, context.get("user"));
    const roles = await this.roleService.findRoles();
    console.log(roles);
    return new SuccessArrayResult(roles, Object);
  }

  @Post()
  @Returns(200, SuccessResult).Of(RoleResultModel)
  public async createRole(@BodyParams() body: RoleParams, @Context() context: Context) {
    await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
    const { name } = body;
    const response = await this.roleService.createRole({ name });
    const result = {
      _id: response._id,
      name: response.name
    };
    return new SuccessResult(result, RoleResultModel);
  }
}
