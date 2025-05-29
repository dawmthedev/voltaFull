import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { AdminModel } from "../models/AdminModel";

@Injectable()
export class UserService {
  constructor(@Inject(AdminModel) private userModel: MongooseModel<AdminModel>) {}

  async findAll(page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.userModel.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize),
      this.userModel.countDocuments()
    ]);
    return { items, total };
  }


  //this causes the suers to fail to load in find all why? 
  // async updateRole(id: string, role: string) {
  //   return this.userModel.findByIdAndUpdate(id, { role }, { new: true });
  // }
}
