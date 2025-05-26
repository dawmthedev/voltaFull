import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { SaleRepModel } from "../models/SaleRepModel";

@Injectable()
export class SaleRepService {
  constructor(@Inject(SaleRepModel) private saleRepModel: MongooseModel<SaleRepModel>) {}

  public async createSaleRep(data: { adminId: string }) {
    return await this.saleRepModel.create({ adminId: data.adminId });
  }

  public async findSaleReps(query: unknown = {}) {
    return await this.saleRepModel.find(query);
  }

  public async findSaleRepById(id: string) {
    return await this.saleRepModel.findById(id);
  }

  public async updateSaleRep(id: string, update: Partial<SaleRepModel>) {
    return await this.saleRepModel.findByIdAndUpdate(id, update);
  }
}
