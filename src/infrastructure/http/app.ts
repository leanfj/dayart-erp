import express from "express";
import cors from "cors";
import { BaseController } from "./interfaces/baseController";
import { errorMiddleware } from "./middlewares/error.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";

export default class App {
  public app: express.Application;

  constructor(controllers: BaseController[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeLogger();
    this.initializeErrorHandling();
    this.initializeControllers(controllers);
  }

  public listen() {
    return this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.EXPRESS_PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeLogger() {
    this.app.use(loggerMiddleware);
  }

  private initializeControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}
