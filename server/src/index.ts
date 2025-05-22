import express from "express";
import { PlatformBuilder } from "@tsed/common";
import { $log } from "@tsed/logger";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./Server";
import mongoose from "mongoose";
import { Secrets } from "./util/secrets";

import cron from "node-cron";
import { notifyLeads, runJob } from "./cron/reminder";

// Schedule the cron job to run every 5 minutes
// cron.schedule("*/15 * * * *", async () => {
//   const planners = await runJob();
//   for (let i = 0; i < planners.length; i++) {
//     const planner = planners[i];
//     const { title, description, action } = planner;
//   }
// });



// cron.schedule("*/15 * * * *", async () => {
//   await notifyLeads();
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
      $log.error(error);
    }
  }

  public async startServer() {
    try {
      await this.platform.listen();
      $log.info("Server started...");
    } catch (error) {
      $log.error(error);
    }
  }
}

(async () => {
  const application = new Application();
  await application.initializeServer();
  await application.startServer();
})();
