import { CollectionOf, Property } from "@tsed/schema";
import { Model, ObjectID } from "@tsed/mongoose";

@Model({ name: "project" })
export class ProjectModel {
  @ObjectID("id")
  _id: string;

  @Property()
  homeowner: string;

  @Property()
  saleDate: string;

  @CollectionOf(String)
  products: string[];

  @Property()
  contractAmount: number;

  @Property()
  status: string;

  @Property()
  stage: string;

  @Property()
  duration: string;

  @Property()
  systemSize: string;

  @Property()
  phone: string;

  @Property()
  address: string;

  @Property()
  installer: string;

  @Property()
  utilityCompany: string;

  @Property()
  salesRep: string;

  @Property()
  projectManager: string;

  @Property()
  financing: string;

  @Property()
  source: string;

  @Property()
  ahj: string;

  @Property()
  qcStatus: string;

  @Property()
  ptoStatus: string;

  @Property()
  assignedTo: string;
}
