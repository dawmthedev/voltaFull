import { Controller, Inject } from "@tsed/di";
import { Get, Returns } from "@tsed/schema";
import { PathParams } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { UserService } from "../../services/UserService";
import { SuccessResult } from "../../util/entities";

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
}
