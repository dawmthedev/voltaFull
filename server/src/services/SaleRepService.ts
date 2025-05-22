import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { SaleRepModel } from "../models/SaleRepModel";
import { AvailabilityService } from "./AvailabilityService";

@Injectable()
export class SaleRepService {
  @Inject(SaleRepModel) private saleRep: MongooseModel<SaleRepModel>;
  @Inject() private availabilityService: AvailabilityService;

  public async findSaleRepBySourceAvailability(leadId: string) {
    const saleRep = await this.saleRep
      .find({ leads: { $ne: leadId } })
      .sort({ score: -1 })
      .limit(1);
    if (!saleRep.length) return false;
    const availability = this.availabilityService.findAvailabilityByDateAndRep(saleRep[0].id);
    if (!availability) return false;
    return saleRep;
  }

  // find lead with highest score
  public async findSaleRepByScore() {
    const saleRep = await this.saleRep.find().sort({ score: -1 }).limit(1);
    if (!saleRep.length) return false;
    const availability = this.availabilityService.findAvailabilityByDateAndRep(saleRep[0].id);
    if (!availability) return false;
    return saleRep;
  }

  // create sale rep
  public async createSaleRep({ adminId }: { adminId: string }) {
    return this.saleRep.create({
      adminId,
      score: 5
    });
  }

  // update sale rep and add lead to sale rep leads
  public async updateSaleRep({ id, leadId }: { id: string; leadId: string }) {
    const saleRep = await this.saleRep.findById({ _id: id });
    if (!saleRep) return false;
    // if sale rep has leadId in leads array field then no need to insert leadId
    if (saleRep.leads.includes(leadId)) return false;
    saleRep.leads.push(leadId);
    return await saleRep.save();
  }

  // find that sale rep that has not leadIds in leads
  public async findSaleRepByLeadIds(leadIds: string[]) {
    // get sale rep that has not leadIds in leads array field  $nin does not work in my case
    const response = await this.saleRep.find().sort({ score: -1 });
    const saleRep = response.filter((rep) => {
      if (rep.leads) {
        const find = leadIds.find((leadId) => {
          return !rep.leads.includes(leadId);
        });
        if (find) return rep;
      }
    });

    return saleRep;
  }

  public async findSaleRepByLeadId(leadId: string) {
    const response = await this.saleRep.find().sort({ score: -1 });

    // for (let i = 0; i < response.length; i++) {
    //   const rep = response[i];
    //   const sRep = rep.leads?.includes(leadId);
    //   const availability = await this.availabilityService.findAvailabilityByDateAndRep(rep.id);
    //   if (!availability) return;
    //   if (sRep) return;
    //   return rep;
    // }
    const filter = response.filter((rep) => {
      const sRep = rep.leads?.includes(leadId);
      // const availability = await this.availabilityService.findAvailabilityByDateAndRep(rep.id);
      // if (!availability) return;
      if (sRep) return;
      return rep;
    });
    const saleRep = filter[0];

    return saleRep;
  }
}
