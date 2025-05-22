import { model, Schema } from "mongoose";
import { categoryModel, plannerModel } from "./model";
import { NodemailerClient } from "../clients/nodemailer";
import { $log } from "@tsed/logger";

export const runJob = async () => {
  const planners = await plannerModel.find();
  return planners;
};

export const notifyLeads = async () => {
  const _planners = await plannerModel.find();
  // filter planners by timeOfExecution and startDate
  const filteredPlanners = _planners.filter((planner) => {
    const timeOfExecution = Number(planner.timeOfExecution);
    const startDate = new Date(planner.startDate);
    const _startDate = `${(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())}`;
    const currentDate = new Date();
    const _currentDate = `${(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())}`;
    return timeOfExecution <= currentDate.getTime() && _startDate == _currentDate;
  });

  $log.info("filteredPlanners-------------**", filteredPlanners);

  const planners = await plannerModel.find({
    timeOfExecution: { $lte: new Date().getTime().toString(), 
    // startDate is today
    startDate: { $eq: new Date().toISOString().split("T")[0] }
    }
  });
  $log.info("planners-------------", planners);
  const categories = await categoryModel.find({
    _id: { $in: planners.map((planner) => planner.categoryId) }
  });
  $log.info("categories-------------", categories);
  filteredPlanners.forEach(async (planner) => {
    // const category = categories.find((category) => category._id === planner.categoryId);
    const category = await categoryModel.findById(planner.categoryId);
    $log.info("category-------------", category);
    if (!category) return;
    let dynamicModel: any;
    try {
      dynamicModel = model(category.name);
    } catch (error) {
      const ProductSchema = new Schema({}, { strict: false });
      dynamicModel = model(category.name, ProductSchema);
    }
    const leads = await dynamicModel.find();
    $log.info("leads-------------", leads);
    leads.forEach(async (lead: any) => {
      try {
        await NodemailerClient.sendEmailToPlanner({
          title: planner.title,
          description: planner.description,
          action: planner.action,
          email: lead.email || ""
        });
        await dynamicModel.updateOne({ _id: lead._id }, { isNotify: false });
      } catch (error) {
        $log.info("error", error);
      }
    });
  });
  return "success";
};
