import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
  BelongsToManyAddAssociationMixin,
} from "sequelize";
import { MaterialModel } from "./material.model";

export class MaterialProdutoModel extends Model<
  InferAttributes<MaterialProdutoModel>,
  InferCreationAttributes<MaterialProdutoModel>
> {
  declare id: CreationOptional<string>;
  declare quantidade: number | null;
  declare dataCadastro: CreationOptional<Date | null>;
  declare dataAtualizacao: CreationOptional<Date | null>;
  declare addMateriais: BelongsToManyAddAssociationMixin<MaterialModel, string>;

  static initModel(sequelize: Sequelize): typeof MaterialProdutoModel {
    MaterialProdutoModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        quantidade: {
          type: DataTypes.DECIMAL(10, 2),
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
        tableName: "materiais_produtos",
        timestamps: true,
        createdAt: "dataCadastro",
        updatedAt: "dataAtualizacao",
      }
    );

    return MaterialProdutoModel;
  }

  static associate(models: any) {
    MaterialProdutoModel.belongsTo(models.MaterialModel, {
      foreignKey: "material_id",
      as: "material",
    });
    MaterialProdutoModel.belongsTo(models.ProdutoModel, {
      foreignKey: "produto_id",
      as: "produto",
    });
    MaterialProdutoModel.belongsTo(models.UnidadeMedidaModel, {
      foreignKey: "unidade_medida_id",
      as: "unidadeMedida",
    });
  }
}
