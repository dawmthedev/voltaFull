import { Model, ObjectID } from "@tsed/mongoose";
import { Default, Property } from "@tsed/schema";
import { Schema } from "mongoose";

export const PayrollSchema = new Schema(
  {
    technicianId: { type: String, required: true },
    projectId: { type: String, required: true },
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
    amountDue: { type: Number, required: true, min: 0 },
    paid: { type: Boolean, default: false },
    paidAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

@Model({ name: "payroll", schema: PayrollSchema })
export class PayrollModel {
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
  createdAt: Date;

  @Property()
  updatedAt: Date;
}
