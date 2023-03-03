import "dotenv/config";

import App from "./app";
import colors from "colors/safe";
import { Database } from "../database/sequelize";
import { ClienteController } from "./controllers/cliente/cliente.controller";
import { UsuarioController } from "./controllers/usuario/usuario.controller";
import { ClienteService } from "./services/cliente/cliente.service";
import { UsuarioService } from "./services/usuario/usuario.service";
import { ClienteDBRepository } from "../repositories/cliente/clienteDB.repository";
import { UsuarioDBRepository } from "../repositories/usuario/usuarioDB.repository";

(async () => {
  const dataBase = new Database();

  dataBase.initModels();

  await dataBase.connect();
  
  const app = new App([
    new ClienteController(new ClienteService(new ClienteDBRepository())),
    new UsuarioController(new UsuarioService(new UsuarioDBRepository()))
  ]);

  const server = app.listen();

  const closeServer = () => {
    console.log(colors.bold(colors.bgRed(colors.black("\nDesligando..."))))

    server.close(async () => {
      console.log(colors.bold(colors.bgRed(colors.black("Fechando todas as conexões...."))))

      await dataBase.disconnect();
      process.exit();
    });

    setTimeout(async () => {
      console.error(
        colors.bold(colors.bgRed(colors.black("Desligamento forçado por não conseguir fechar as conexões")))
      );
      process.exit(1);
    }, 30 * 1000);
  };

  process.on("SIGINT", closeServer);
  process.on("SIGTERM", closeServer);
})();
