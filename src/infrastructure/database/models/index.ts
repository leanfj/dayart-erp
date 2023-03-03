import type { Sequelize} from "sequelize";
import { ClienteModel } from "./cliente.model";
import { UsuarioModel } from "./usuario.model";

export { ClienteModel, UsuarioModel };

export function initModels(sequelize: Sequelize) {
  ClienteModel.initModel(sequelize);
  UsuarioModel.initModel(sequelize);
  return {
    ClienteModel,
    UsuarioModel,
  };
}
