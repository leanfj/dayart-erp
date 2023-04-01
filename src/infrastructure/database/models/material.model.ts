import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
  ForeignKey,
} from "sequelize";
import { UnidadeMedidaModel } from "./unidadeMedida.model";
import { MaterialProdutoUnidadeMedidaModel } from "./materialProdutoUnidadeMedida.model";

export class MaterialModel extends Model<
  InferAttributes<MaterialModel>,
  InferCreationAttributes<MaterialModel>
> {
  declare id: CreationOptional<string>;
  declare titulo: string | null;
  declare descricao: string | null;
  declare codigo: string | null;
  declare valor: number | null;
  declare valorUnitario: number | null;
  declare quantidade: number | null;
  declare unidadeMedidaId: ForeignKey<UnidadeMedidaModel["id"]>;
  declare dataCadastro: CreationOptional<Date | null>;
  declare dataAtualizacao: CreationOptional<Date | null>;

  static initModel(sequelize: Sequelize): typeof MaterialModel {
    MaterialModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        titulo: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        descricao: {
          type: DataTypes.STRING(255),
        },
        codigo: {
          type: DataTypes.STRING(255),
        },
        quantidade: {
          type: DataTypes.DECIMAL(10, 2),
        },
        valor: {
          type: DataTypes.DECIMAL(10, 2),
        },
        valorUnitario: {
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
        tableName: "materiais",
        timestamps: true,
        createdAt: "dataCadastro",
        updatedAt: "dataAtualizacao",
      }
    );

    return MaterialModel;
  }

  static associate(models: any) {
    MaterialModel.belongsTo(models.UnidadeMedidaModel, {
      foreignKey: "unidade_medida_id",
      as: "unidadeMedida",
    });

    MaterialModel.hasMany(models.MaterialProdutoUnidadeMedidaModel, {
      foreignKey: "material_id",
      as: "material",
    });

    MaterialModel.belongsToMany(models.ProdutoModel, {
      through: {
        model: MaterialProdutoUnidadeMedidaModel,
        unique: false,
      },
      as: "produtos",
      foreignKey: "material_id",
      otherKey: "produto_id",
    });


    MaterialModel.belongsToMany(models.UnidadeMedidaModel, {
      through: {
        model: MaterialProdutoUnidadeMedidaModel,
        unique: false
      },
      as: "unidadeMedidas",
      foreignKey: "unidade_medida_id",
      otherKey: "produto_id"
    });

    MaterialModel.hasMany(models.MaterialProdutoModel, {
      foreignKey: "material_id",
      as: "materiaisProdutos",
    });
  }
}
