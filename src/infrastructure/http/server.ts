// import "dotenv/config";

import App from "./app";
import colors from "colors/safe";
import { Database } from "../database/sequelize";

import { ClienteController } from "./controllers/cliente/cliente.controller";
import { UsuarioController } from "./controllers/usuario/usuario.controller";
import { ProdutoController } from "./controllers/produto/produto.controller";
import { MaterialController } from "./controllers/material/material.controller";
import { UnidadeMedidaController } from "./controllers/unidadeMedida/unidadeMedida.controller";
import { AutorizacaoController } from "./controllers/autorizacao/autorizacao.controller";

import { ClienteService } from "./services/cliente/cliente.service";
import { UsuarioService } from "./services/usuario/usuario.service";
import { ProdutoService } from "./services/produto/produto.service";
import { MaterialService } from "./services/material/material.service";
import { UnidadeMedidaService } from "./services/unidadeMedida/unidadeMedida.service";
import { LoginService } from "./services/autorizacao/login.service";

import { ClienteDBRepository } from "../repositories/cliente/clienteDB.repository";
import { UsuarioDBRepository } from "../repositories/usuario/usuarioDB.repository";
import { ProdutoDBRepository } from "../repositories/produto/produtoDB.repository";
import { MaterialDBRepository } from "../repositories/material/materialDB.repository";
import { UnidadeMedidaDBRepository } from "../repositories/unidadeMedida/unidadeMedidaDB.repository";

(async () => {
  const dataBase = new Database();

  dataBase.initModels();
  dataBase.initAssociations();

  await dataBase.connect();

  const clienteService = new ClienteService(new ClienteDBRepository());
  const usuarioService = new UsuarioService(new UsuarioDBRepository());
  const produtoService = new ProdutoService(new ProdutoDBRepository());
  const materialService = new MaterialService(new MaterialDBRepository(), new UnidadeMedidaDBRepository());
  const unidadeMedidaService = new UnidadeMedidaService(new UnidadeMedidaDBRepository());
  const loginService = new LoginService();

  const app = new App([
    new ClienteController(clienteService),
    new UsuarioController(usuarioService),
    new ProdutoController(produtoService),
    new MaterialController(materialService),
    new UnidadeMedidaController(unidadeMedidaService),
    new AutorizacaoController(loginService, usuarioService),
  ]);

  const server = app.listen();

  const closeServer = () => {
    console.log(colors.bold(colors.bgRed(colors.black("\nDesligando..."))));

    server.close(async () => {
      console.log(
        colors.bold(
          colors.bgRed(colors.black("Fechando todas as conexões...."))
        )
      );

      await dataBase.disconnect();
      process.exit();
    });

    setTimeout(async () => {
      console.error(
        colors.bold(
          colors.bgRed(
            colors.black(
              "Desligamento forçado por não conseguir fechar as conexões"
            )
          )
        )
      );
      process.exit(1);
    }, 30 * 1000);
  };

  process.on("SIGINT", closeServer);
  process.on("SIGTERM", closeServer);
})();
