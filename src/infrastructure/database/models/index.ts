import type { Sequelize} from "sequelize";
import { ClienteModel } from "./cliente.model";
import { UsuarioModel } from "./usuario.model";
import { ProdutoModel} from "./produto.model";
import { TokenModel } from "./token.model";
import { MaterialModel } from "./material.model";
import { UnidadeMedidaModel } from "./unidadeMedida.model";
import { MaterialProdutoModel } from "./materialProduto.model";

export { ClienteModel, UsuarioModel, TokenModel, ProdutoModel, MaterialModel, UnidadeMedidaModel };

export function initModels(sequelize: Sequelize) {
  ClienteModel.initModel(sequelize);
  UsuarioModel.initModel(sequelize);
  TokenModel.initModel(sequelize);
  ProdutoModel.initModel(sequelize);
  MaterialModel.initModel(sequelize);
  UnidadeMedidaModel.initModel(sequelize);
  MaterialProdutoModel.initModel(sequelize);
  return {
    ClienteModel,
    UsuarioModel,
    TokenModel,
    ProdutoModel,
    MaterialModel,
    UnidadeMedidaModel,
    MaterialProdutoModel,
  };
}

export function initAssociations(sequelize: Sequelize) {
  MaterialModel.associate(
    sequelize.models as {
      [key: string]: any;
    }
  );
  ProdutoModel.associate(
    sequelize.models as {
      [key: string]: any;
    }
  );
  MaterialProdutoModel.associate(
    sequelize.models as {
      [key: string]: any;
    }
  );
}