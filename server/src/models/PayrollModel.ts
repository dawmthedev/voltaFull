import { Model, ObjectID } from "@tsed/mongoose";
import { Property, Required } from "@tsed/schema";

@Model({ name: "payroll" })
export class PayrollModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  projectId: string;

  @Property()
  @Required()
  technicianId: string;

  @Property()
  @Required() // Add Required decorator
  projectName: string;

  @Property()
  @Required() // Add Required decorator
  technicianName: string;

  @Property()
  @Required()
  percentage: number;

  @Property()
  @Required()
  amountDue: number; // Make sure this is a simple number field without any transforms

  @Property()
  paid: boolean = false;

  @Property()
  paidAt?: Date;
}
