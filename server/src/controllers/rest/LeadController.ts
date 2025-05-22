import { Controller, Inject } from "@tsed/di";
import { Property, Required } from "@tsed/schema";
import { AdminService } from "../../services/AdminService";
import { LeadService } from "../../services/LeadsService";

class LeadBodyParam {
  @Required() public firstName: string;
  @Property() public lastName: string;
  @Required() public email: string;
  @Required() public phone: string;
  @Required() public categoryId: string;
}

@Controller("/lead")
export class LeadController {
  @Inject()
  private adminService: AdminService;
  @Inject()
  private leadService: LeadService;

}
