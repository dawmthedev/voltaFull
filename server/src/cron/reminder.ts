import { NodemailerClient } from "../clients/nodemailer";
import { PlannerService } from "../services/PlannerService";

// connect to database
import mongoose from "mongoose";
import { Secrets } from "../util/secrets";
import { createSchema } from "../helper";

const runJob = async () => {
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
  await NodemailerClient.sendEmailToPlanner({ title: "hello", email: "raza8r@gmail.com", description: "desc", action: "email" });
  //   if (planners.length) {
  //     for (let i = 0; i < 1; i++) {
  //       const planner = planners[i];
  //       const { title, description, action } = planner;
  //       console.log("planner----------------", { title, description, action });
  //       // send email to to planner
  //       await NodemailerClient.sendEmailToPlanner({ title, email: "raza8r@gmail.com", description, action });
  //     }
  //   }
  return "cron job completed";
};

(async () => {
  await Secrets.initialize();
  // establish database connection with mongoose.connect()
  const connect = await mongoose.connect(
    process.env.DATABASE_URL || "mongodb+srv://raza8r:NeI8lXcbMXOGCebS@crm-cluster.bl1i8v3.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Start cron job-----------------");
  await runJob();
  // close database connection
  await connect.disconnect();
  console.log("End cron job-----------------");
})();
