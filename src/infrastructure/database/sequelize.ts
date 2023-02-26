import { Dialect, Sequelize } from "sequelize";
import colors from "colors/safe";

export class Database {
  private sequelizeConnection: Sequelize;
  private dbName: string;
  private user: string;
  private password: string;
  private host: string;
  private dialect: Dialect;
  private port: string;

  constructor(
    dbName: string,
    user: string,
    password: string,
    host: string,
    dialect: Dialect,
    port: string
  ) {
    this.dbName = dbName;
    this.user = user;
    this.password = password;
    this.host = host;
    this.dialect = dialect;
    this.port = port;
    this.sequelizeConnection = new Sequelize(
      this.dbName,
      this.user,
      this.password,
      {
        host: this.host,
        dialect: this.dialect,
        port: Number(this.port),
        logging: (logStr, options) => this.log(logStr, options),
        timezone: "-03:00",
        dialectOptions: {
          useUTC: false,
        },
      }
    );
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
}
