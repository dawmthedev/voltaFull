import { Controller, Inject } from "@tsed/di";
import { Get, Post, Returns } from "@tsed/schema";
import { PathParams, BodyParams } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { UserService } from "../../services/UserService";
import { SuccessResult } from "../../util/entities";
import { AdminResultModel } from "../../models/RestModels";

@Controller("/users")
export class UserController {
  @Inject()
  private userService: UserService;

  @Get("/:id/payroll-details")
  @Returns(200, SuccessResult)
  public async getUserPayrollDetails(@PathParams("id") id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFound(`User with id ${id} not found`);
    }
    return new SuccessResult({
      userId: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role
    });
  }

  @Post("/:id/role")
  @(Returns(200, SuccessResult).Of(AdminResultModel))
  public async updateRole(@PathParams("id") id: string, @BodyParams("role") role: string) {
    console.log(`Updating user ${id} role to ${role}`);
    const user = await this.userService.updateRole(id, role);
    if (!user) {
      throw new NotFound(`User with id ${id} not found`);
    }
    return new SuccessResult(user, AdminResultModel);
  }
}
