import { Inject, Injectable } from "@tsed/di";
import { Unauthorized } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { AdminModel } from "../models/AdminModel";
import { JWTPayload } from "../../types";
import { ADMIN } from "../util/constants";

@Injectable()
export class UserService {
  constructor(@Inject(AdminModel) private userModel: MongooseModel<AdminModel>) {}

  async findAll(user?: JWTPayload) {
    const role = user?.role;
    if (!role || (role !== ADMIN && role.toLowerCase() !== "admin")) {
      throw new Unauthorized("Access denied");
    }
    return this.userModel.find().sort({ createdAt: -1 });
  }
}
