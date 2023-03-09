import { Sequelize, Options } from "sequelize";
import config from "./config/config";
import colors from "colors/safe";
import { initModels } from "./models";

export class Database {
  private sequelizeConnection: Sequelize;
  private env = process.env.NODE_ENV || "development";
  private config = (config as { [key: string]: Options })[this.env];

  constructor() {
    this.sequelizeConnection = new Sequelize({
      ...this.config,
      logging: (logStr, options) => this.log(logStr, options),
      timezone: "-03:00",
      dialectOptions: {
        useUTC: false,
        socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
      },
      define: {
        underscored: true,
      },
    });
  }

  public async connect() {
    await this.sequelizeConnection.authenticate();
    return this.sequelizeConnection;
  }

  private async log(logStr: string, opts: any) {
    let col = null;
    switch (opts?.type) {
      case "SELECT":
        col = colors.blue;
        break;
      case "UPDATE":
        col = colors.yellow;
        break;
      case "INSERT":
        col = colors.green;
        break;
      default:
        col = colors.white;
        break;
    }
    console.log(colors.bold(col(logStr)));
    // if (execTime) {
    //   if (execTime >= 10) {
    //     col = colors.red;
    //     console.log(
    //       colors.magenta(`[${execTime} ms]`),
    //       colors.bold(col(logStr))
    //     );
    //   } else {
    //   }
    // }
  }

  public async disconnect() {
    await this.sequelizeConnection.close();
  }

  public initModels() {
    initModels(this.sequelizeConnection);
  }
}
