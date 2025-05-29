import { Controller, Inject } from "@tsed/di";
import { Context, QueryParams } from "@tsed/common";
import { Get, Patch, BodyParams, PathParams, Returns } from "@tsed/schema";
import { UserService } from "../../services/UserService";
import { AdminResultModel } from "../../models/RestModels";
import { SuccessArrayResult } from "../../util/entities";
import { SuccessResult } from "../../util/entities";
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

  @Patch(":id")
  @(Returns(200, SuccessResult).Of(AdminResultModel))
  async updateRole(@PathParams("id") id: string, @BodyParams("role") role: string) {
    const user = await this.userService.updateRole(id, role);
    return new SuccessResult(user, AdminResultModel);
  }
}
