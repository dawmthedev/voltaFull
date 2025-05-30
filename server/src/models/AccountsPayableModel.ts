import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Default, Property } from "@tsed/schema";
import { AdminModel } from "./AdminModel";
import { ProjectModel } from "./ProjectModel";

@Model({ name: "accountsPayable" })
export class AccountsPayableModel {
  @ObjectID("id")
  _id: string;

  @Property()
  technicianId: string;

  @Property()
  projectId: string;

  @Property()
  percentage: number;

  @Property()
  amountDue: number;

  @Property()
  @Default(false)
  paid: boolean;

  @Property()
  paidAt?: Date;

  @Property()
  @Default(() => new Date())
  createdAt: Date;

  @Property()
  @Default(() => new Date())
  updatedAt: Date;

  @Ref(() => AdminModel)
  technician: Ref<AdminModel>;

  @Ref(() => ProjectModel)
  project: Ref<ProjectModel>;
}

@Model({ name: "payroll" })
export class PayrollModel extends AccountsPayableModel {}
