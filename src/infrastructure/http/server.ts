import "dotenv/config";
import { Dialect } from "sequelize";

import App from "./app";
import { Database } from "../database/sequelize";
import { ClienteController } from "./controllers/cliente.controller";
import { ClienteService } from "./services/cliente.service";
import { ClienteInMemoryRepository } from "../repositories/clienteInMemory.repository";

(async () => {
  const {
    SEQUELIZE_DB_NAME,
    SEQUELIZE_DB_USER,
    SEQUELIZE_DB_PASSWORD,
    SEQUELIZE_DB_DIALECT,
    SEQUELIZE_DB_HOST,
    SEQUELIZE_DB_PORT,
  } = process.env;

  const dataBase = new Database(
    SEQUELIZE_DB_NAME as string,
    SEQUELIZE_DB_USER as string,
    SEQUELIZE_DB_PASSWORD as string,
    SEQUELIZE_DB_HOST as string,
    SEQUELIZE_DB_DIALECT as Dialect,
    SEQUELIZE_DB_PORT as string,
  );

  const connection = await dataBase.connect();
  
  const app = new App([
    new ClienteController(new ClienteService(new ClienteInMemoryRepository())),
  ]);

  const server = app.listen();

  const closeServer = () => {
    console.log("closeServer");

    server.close(async () => {
      console.log("Fechando todas as conexões.");
      await dataBase.disconnect();
      process.exit();
    });

    setTimeout(async () => {
      console.error(
        "Desligamento forçado por não conseguir fechar as conexões"
      );
      process.exit(1);
    }, 30 * 1000);
  };

  process.on("SIGINT", closeServer);
  process.on("SIGTERM", closeServer);
})();
