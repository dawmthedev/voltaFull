import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { AvailabilityDataTypes } from "../../types";
import { AvailabilityModel } from "../models/AvailabilityModel";
import { SaleRepModel } from "../models/SaleRepModel";

@Injectable()
export class AvailabilityService {
  // constructor(@Inject(PlannerModel) private planner: MongooseModel<PlannerModel>) {}
  @Inject(AvailabilityModel) private availability: MongooseModel<AvailabilityModel>;
  @Inject(SaleRepModel) private saleRep: MongooseModel<SaleRepModel>;

  public async findAvailability() {
    return await this.availability.find();
  }

  public async findAvailabilityById(id: string) {
    return await this.availability.findById({ _id: id });
  }

  public async createAvailability({ startDate, endDate, adminId }: AvailabilityDataTypes) {
    return await this.availability.create({
      startDate,
      endDate,
      adminId
    });
  }
  public async deleteAvailability(id: string) {
    return await this.availability.deleteOne({ _id: id });
  }

  public async findAvailabilityByAdminId(adminId: string) {
    return await this.availability.find({ adminId });
  }

  // find availability that does not greater than the current date
  public async findAvailabilityByDateAndRep(repId: string) {
    const currentDate = new Date().getTime();
    const availability = await this.availability.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      adminId: repId
    });
    if (availability.length) return false;
    return true;
  }
}
