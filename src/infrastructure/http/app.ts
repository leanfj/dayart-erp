import express from "express";
import cors from "cors";
import colors from "colors/safe";
import { BaseController } from "./interfaces/baseController";
import { errorMiddleware } from "./middlewares/error.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";

export default class App {
  public app: express.Application;
  private readonly port: number;

  constructor(controllers: BaseController[]) {
    this.app = express();
    this.port = parseInt(process.env.PORT) || 3333;
    this.initializeMiddlewares();
    this.initializeLogger();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    return this.app.listen(this.port, () => {
        
      console.log(colors.bold(colors.bgGreen(colors.black("-----Servidor iniciado com sucesso!-----"))));
      console.log(colors.bold(colors.bgGreen(colors.black(`-----App listening on the port ${this.port}-----`))));

    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {

    this.app.use(express.text({
      type: '*/*'
    }));
    this.app.use(express.json());

    this.app.use(cors({
      origin: '*',
    }));
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
