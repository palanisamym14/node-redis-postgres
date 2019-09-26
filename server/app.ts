import dotenv from "dotenv";
import express from "express";
import path from "path";
// tslint:disable-next-line:max-line-length
import {
  InBoundSMSController,
  OutBoundSMSController
} from "./controllers/index";
import DataBaseConnection from "./db";
class App {
  public express: express.Application;

  constructor() {
    this.setEnvironment();
    this.database();
    this.express = express();
    this.middleware();
    this.initializeControllers(this.InitRoute());
  }

  /**
   * database connection
   */
  private async database() {
    await DataBaseConnection.connect();
  }

  /**
   * http(s) request middleware
   */
  private middleware(): void {
    this.express.use(express.urlencoded());
    this.express.use(express.json());
    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // dev only
      res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, x-client-id"
      );
      if (req.method === "OPTIONS") {
        res.status(200).send();
      } else {
        next();
      }
    });
  }

  /**
   * app environment configuration
   */
  private setEnvironment(): void {
    dotenv.config({ path: ".env" });
  }

  /**
   * API main routes
   */
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.express.use("/", controller.router);
    });
    this.express.use("*", (req, res) => {
      res.status(405).send({ error: `\/${req.baseUrl}\/ method not allowed` });
    });
  }

  private InitRoute() {
    return [new OutBoundSMSController(), new InBoundSMSController()];
  }
}

export default new App().express;
