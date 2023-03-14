import type { Sequelize} from "sequelize";
import { ClienteModel } from "./cliente.model";
import { UsuarioModel } from "./usuario.model";
import { ProdutoModel} from "./produto.model";
import { TokenModel } from "./token.model";
import { MaterialModel } from "./material.model";
import { UnidadeMedidaModel } from "./unidadeMedida.model";

export { ClienteModel, UsuarioModel, TokenModel, ProdutoModel, MaterialModel, UnidadeMedidaModel };

export function initModels(sequelize: Sequelize) {
  ClienteModel.initModel(sequelize);
  UsuarioModel.initModel(sequelize);
  TokenModel.initModel(sequelize);
  ProdutoModel.initModel(sequelize);
  MaterialModel.initModel(sequelize);
  UnidadeMedidaModel.initModel(sequelize);
  return {
    ClienteModel,
    UsuarioModel,
    TokenModel,
    ProdutoModel,
    MaterialModel,
    UnidadeMedidaModel
  };
}

export function initAssociations(sequelize: Sequelize) {
  MaterialModel.associate(
    sequelize.models as {
      [key: string]: any;
    }
  );
}