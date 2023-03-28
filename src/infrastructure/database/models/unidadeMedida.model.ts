import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { MaterialProdutoModel } from "./materialProduto.model";

export class UnidadeMedidaModel extends Model<
  InferAttributes<UnidadeMedidaModel>,
  InferCreationAttributes<UnidadeMedidaModel>
> {
  declare id: CreationOptional<string>;
  declare nome: string | null;
  declare nomenclatura: string | null;
  declare categoria: string | null;
  declare dataCadastro: CreationOptional<Date | null>;
  declare dataAtualizacao: CreationOptional<Date | null>;

  static initModel(sequelize: Sequelize): typeof UnidadeMedidaModel {
    UnidadeMedidaModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        nome: {
          type: DataTypes.STRING(255),
        },
        nomenclatura: {
          type: DataTypes.STRING(255),
        },
        categoria: {
          type: DataTypes.STRING(255),
        },
        dataCadastro: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        dataAtualizacao: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "unidade_medidas",
        timestamps: true,
        createdAt: "dataCadastro",
        updatedAt: "dataAtualizacao",
      }
    );

    return UnidadeMedidaModel;
  }

  static associate(models: any) {
    UnidadeMedidaModel.hasMany(models.MaterialProdutoUnidadeMedidaModel, {
      foreignKey: "unidade_medida_id",
      as: "materiais_produtos_unidades_medidas",
    });

  }
}
