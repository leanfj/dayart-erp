import type { Sequelize} from "sequelize";
import { ClienteModel } from "./cliente.model";
import { UsuarioModel } from "./usuario.model";
import { ProdutoModel} from "./produto.model";
import { TokenModel } from "./token.model";
import { MaterialModel } from "./material.model";

export { ClienteModel, UsuarioModel, TokenModel, ProdutoModel, MaterialModel };

export function initModels(sequelize: Sequelize) {
  ClienteModel.initModel(sequelize);
  UsuarioModel.initModel(sequelize);
  TokenModel.initModel(sequelize);
  ProdutoModel.initModel(sequelize);
  MaterialModel.initModel(sequelize);
  return {
    ClienteModel,
    UsuarioModel,
    TokenModel,
    ProdutoModel,
    MaterialModel,
  };
}
