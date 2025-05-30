import { CollectionOf, Property } from "@tsed/schema";
import { Model, ObjectID, Indexed, Ref } from "@tsed/mongoose";
import { Schema } from "mongoose";

const PayrollSchema = new Schema(
  {
    technicianId: { type: String, required: true },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      validate: {
        validator: Number.isFinite,
        message: "Percentage must be a valid number"
      }
    },
    amountDue: {
      type: Number,
      required: true,
      min: 0
    },
    paid: { type: Boolean, default: false }
  },
  { _id: false }
);

@Model({ name: "project" })
export class ProjectModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Indexed()
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
  salesRepId: string;

  @CollectionOf(String)
  technicians: string[];

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

  @Property()
  piecemealPercent: number;

  @Property()
  payroll: {
    technicianId: string;
    percentage: number;
    amountDue: number;
    paid: boolean;
  }[];
}
