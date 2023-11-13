import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { PlannerDataTypes } from "../../types";
import { PlannerModel } from "../models/PlannerModel";

@Injectable()
export class PlannerService {
  constructor(@Inject(PlannerModel) private planner: MongooseModel<PlannerModel>) {}

  public async findPlanner() {
    return await this.planner.find();
  }

  public async findPlannerById(id: string) {
    return await this.planner.findById({ _id: id });
  }

  public async createPlanner({ title, action, description, startDate, endDate, timeOfExecution, orgId, adminId }: PlannerDataTypes) {
    return await this.planner.create({
      title,
      action,
      description,
      startDate,
      endDate,
      timeOfExecution,
      orgId,
      adminId
    });
  }
}
