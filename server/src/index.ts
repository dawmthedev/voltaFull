import express from "express";
import dotenv from "dotenv";
import { PlatformBuilder } from "@tsed/common";
import logger from "./util/logger";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./Server";
import mongoose from "mongoose";
import { Secrets } from "./util/secrets";

dotenv.config();

export class Application {
  private app: express.Application;
  private platform: PlatformBuilder;
  public databaseConnection: unknown;

  public async initializeServer() {
    await Secrets.initialize();
    // establish database connection with mongoose.connect()
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error("DATABASE_URL is not set. Please configure it to connect to MongoDB.");
    }
    this.databaseConnection = await mongoose.connect(dbUrl);

    try {
      this.app = express();
      this.platform = await PlatformExpress.bootstrap(Server, {
        express: { app: this.app }
      });
    } catch (error) {
      logger.error(error);
    }
  }

  public async startServer() {
    try {
      await this.platform.listen();
      logger.success("Server started...");
    } catch (error) {
      logger.error(error);
    }
  }
}

(async () => {
  const application = new Application();
  await application.initializeServer();
  await application.startServer();
})();
