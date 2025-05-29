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
    return this.userModel.find().sort({ createdAt: -1 });
  }
}
