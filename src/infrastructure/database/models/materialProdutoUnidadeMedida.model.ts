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
import { UnidadeMedidaModel } from "./unidadeMedida.model";
import { ProdutoModel } from "./produto.model";

export class MaterialProdutoUnidadeMedidaModel extends Model<
  InferAttributes<MaterialProdutoUnidadeMedidaModel>,
  InferCreationAttributes<MaterialProdutoUnidadeMedidaModel>
> {
  declare id: CreationOptional<string>;
  declare dataCadastro: CreationOptional<Date | null>;
  declare dataAtualizacao: CreationOptional<Date | null>;
  declare quantidade: number | null;
  declare addMateriais: BelongsToManyAddAssociationMixin<MaterialModel, string>;

  static initModel(
    sequelize: Sequelize
  ): typeof MaterialProdutoUnidadeMedidaModel {
    MaterialProdutoUnidadeMedidaModel.init(
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
        tableName: "materiais_produtos_unidades_medidas",
        timestamps: true,
        createdAt: "dataCadastro",
        updatedAt: "dataAtualizacao",
      }
    );

    return MaterialProdutoUnidadeMedidaModel;
  }

  static associate(models: any) {
      // MaterialProdutoUnidadeMedidaModel.belongsTo(models.MaterialProdutoModel, {
      //   foreignKey: "material_produto_id",
      //   as: "material_produto",
      // });
      MaterialProdutoUnidadeMedidaModel.belongsTo(models.UnidadeMedidaModel, {
        foreignKey: "unidade_medida_id",
        as: "unidadeMedida",
      });
      MaterialProdutoUnidadeMedidaModel.belongsTo(models.MaterialModel, {
        foreignKey: "material_id",
        as: "material",
      });
      MaterialProdutoUnidadeMedidaModel.belongsTo(models.ProdutoModel, {
        foreignKey: "produto_id",
        as: "produto",
      });
    }
  
}
