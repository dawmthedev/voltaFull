import logger from "../util/logger";

// Demonstrates the emoji logger output
logger.success("Server Started");
logger.request("Testing Login...");
logger.error(new Error("Something went wrong"));
