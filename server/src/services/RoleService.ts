import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { RoleModel } from "../models/RoleModel";

@Injectable()
export class RoleService {
  constructor(@Inject(RoleModel) private roleModel: MongooseModel<RoleModel>) {}

  public async findRoles() {
    return await this.roleModel.find();
  }

  public async createRole(data: { name: string }) {
    return await this.roleModel.create({ name: data.name });
  }

  public async updateRole(data: { _id: string; name: string }) {
    return await this.roleModel.findByIdAndUpdate(data._id, { name: data.name });
  }
}
