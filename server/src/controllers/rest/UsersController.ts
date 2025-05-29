import { Controller, Inject } from "@tsed/di";
import { Context, QueryParams } from "@tsed/common";
import { Get, Returns } from "@tsed/schema";
import { UserService } from "../../services/UserService";
import { AdminResultModel } from "../../models/RestModels";
import { SuccessArrayResult } from "../../util/entities";
import { Unauthorized } from "@tsed/exceptions";

@Controller("/users")
export class UsersController {
  @Inject()
  private userService: UserService;

  // @Get("/")
  // @(Returns(200, SuccessArrayResult).Of(AdminResultModel))
  // async getAll(@Context() ctx: Context) {
  //   const user = ctx.get("user");
  //   const users = await this.userService.findAll(user);
  //   return new SuccessArrayResult(users, AdminResultModel);
  // }

  // controllers/rest/UsersController.ts
  // @Get("")
  // @(Returns(200, SuccessArrayResult).Of(AdminResultModel))
  // async getAll(@Context() ctx: Context) {
  //   const user = ctx.get("authUser");
  //   if (!user || user.role.toLowerCase() !== "admin") {
  //     throw new Unauthorized("Access denied for user with role " + (user ? user.role : "unknown"));
  //   }
  //   const users = await this.userService.findAll(); // service no longer needs the context
  //   return new SuccessArrayResult(users, AdminResultModel);
  // }

  @Get()
  @(Returns(200, SuccessArrayResult).Of(AdminResultModel))
  public async getUsers(@QueryParams('page') page: number = 1, @QueryParams('pageSize') pageSize: number = 20) {
    const { items, total } = await this.userService.findAll(page, pageSize);
    return { data: items, total };
  }
}
