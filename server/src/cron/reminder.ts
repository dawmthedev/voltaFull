import mongoose from "mongoose";
import { Secrets } from "../util/secrets";
import { createSchema } from "../helper";

export const runJob = async () => {
  const model = createSchema({
    tableName: "planners",
    columns: [
      { name: "title", type: "string" },
      { name: "action", type: "string" },
      { name: "description", type: "string" },
      { name: "timeOfExecution", type: "string" },
      { name: "startDate", type: "string" },
      { name: "endDate", type: "string" },
      { name: "orgId", type: "string" },
      { name: "adminId", type: "string" }
    ]
  });
  const planners = await model.find();
  return planners;
};
