import { Controller, Inject } from "@tsed/di";
import { Context } from "@tsed/platform-params";
import { Get, Returns } from "@tsed/schema";
import { UserService } from "../../services/UserService";
import { AdminResultModel } from "../../models/RestModels";
import { SuccessArrayResult } from "../../util/entities";

@Controller("/users")
export class UsersController {
  @Inject()
  private userService: UserService;

  @Get("/")
  @(Returns(200, SuccessArrayResult).Of(AdminResultModel))
  async getAll(@Context() ctx: Context) {
    const user = ctx.get("user");
    const users = await this.userService.findAll(user);
    return new SuccessArrayResult(users, AdminResultModel);
  }
}
