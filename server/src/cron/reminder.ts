import { model, Schema } from "mongoose";
import { categoryModel, plannerModel } from "./model";
import { NodemailerClient } from "../clients/nodemailer";

export const runJob = async () => {
  const planners = await plannerModel.find();
  return planners;
};

export const notifyLeads = async () => {
  const planners = await plannerModel.find({
    timeOfExecution: { $gte: new Date() },
    startDate: { $eq: new Date() }
  });
  const categories = await categoryModel.find({
    _id: { $in: planners.map((planner) => planner.categoryId) }
  });

  planners.forEach(async (planner) => {
    const category = categories.find((category) => category._id === planner.categoryId);
    const schema = new Schema({}, { strict: false });
    const _model = model(category.name, schema);
    const leads = await _model.find({
      isNotify: true,
      categoryId: category._id
    });
    leads.forEach(async (lead: any) => {
      try {
        await NodemailerClient.sendEmailToPlanner({
          title: planner.title,
          description: planner.description,
          action: planner.action,
          email: lead.email || ""
        });
        await _model.updateOne({ _id: lead._id }, { isNotify: false });
      } catch (error) {
        console.log("error", error);
      }
    });
  });
};
