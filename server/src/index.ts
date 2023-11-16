import express from "express";
import { PlatformBuilder } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./Server";
import mongoose from "mongoose";
import { Secrets } from "./util/secrets";
import { PlannerController } from "./controllers/rest/PlannerController";

import cron from "node-cron";
import { NodemailerClient } from "./clients/nodemailer";
import { PlannerService } from "./services/PlannerService";
import { PlannerModel } from "./models/PlannerModel";

// const planner = new PlannerService();

// // Schedule the cron job to run every 5 minutes
// cron.schedule("*/2 * * * *", async () => {
//   console.log("Running cron job");
//   const planners = await planner.runJob();
//   // await NodemailerClient.sendEmailToPlanner({ title: "cron job", email: "raza8r@gmail.com", description: "cron des", action: "email" });
//   console.log("cron job completed---------", planners);
//   // const plannerController = new PlannerController();
//   // await plannerController.runJob();
// });

export class Application {
  private app: express.Application;
  private platform: PlatformBuilder;
  public databaseConnection: any;

  public async initializeServer() {
    await Secrets.initialize();
    // establish database connection with mongoose.connect()
    this.databaseConnection = await mongoose.connect(process.env.DATABASE_URL || "");

    try {
      this.app = express();
      this.platform = await PlatformExpress.bootstrap(Server, {
        express: { app: this.app }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async startServer() {
    try {
      await this.platform.listen();
      console.log("Server started...");
    } catch (error) {
      console.log(error);
    }
  }
}

(async () => {
  const application = new Application();
  await application.initializeServer();
  await application.startServer();
})();
