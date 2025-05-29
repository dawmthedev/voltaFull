import { Property } from "@tsed/schema";
import {
  Model,
  ObjectID,
  Ref,
  Indexed,
  MongooseIndex,
  PreHook
} from "@tsed/mongoose";
import mongoose from "mongoose";
import { ProjectModel } from "./ProjectModel";
import { AdminModel } from "./AdminModel";

@Model({ name: "accountPayable" })
@MongooseIndex({ projectId: 1, technicianId: 1 })
@MongooseIndex({ paid: 1 })
export class AccountPayableModel {
  @ObjectID("id")
  _id: string;

  @Ref(() => ProjectModel)
  @Property()
  projectId: Ref<ProjectModel>;

  @Ref(() => AdminModel)
  @Property()
  technicianId: Ref<AdminModel>;

  @Property()
  allocationPercent: number;

  @Property()
  amountDue: number;

  @Property()
  @Indexed()
  paid: boolean;

  @Property()
  paidAt?: Date;

  @PreHook("save")
  static async preSave(doc: AccountPayableModel, next: () => void) {
    if (doc.projectId && doc.allocationPercent != null) {
      try {
        const Project = mongoose.model<ProjectModel & mongoose.Document>("project");
        const project = await Project.findById(doc.projectId).lean();
        if (project && typeof project.contractAmount === "number") {
          doc.amountDue =
            (project.contractAmount * doc.allocationPercent) / 100;
        }
      } catch {
        // ignore lookup errors
      }
    }
    next();
  }
}
