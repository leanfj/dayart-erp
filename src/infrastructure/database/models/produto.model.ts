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
import { MaterialProdutoModel } from "./materialProduto.model";

export class ProdutoModel extends Model<
  InferAttributes<ProdutoModel>,
  InferCreationAttributes<ProdutoModel>
> {

  declare id: CreationOptional<string>;
  declare titulo: string | null;
  declare descricao: string | null;
  declare codigo: string | null;
  declare valorVenda: number | null;
  declare valorCusto: number | null;
  declare prazoProducao: string | null;
  declare dataCadastro: CreationOptional<Date | null>;
  declare dataAtualizacao: CreationOptional<Date | null>;
  declare addMateriais: BelongsToManyAddAssociationMixin<MaterialModel, string>;

  static initModel(sequelize: Sequelize): typeof ProdutoModel {
    ProdutoModel.init(
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
        valorVenda: {
          type: DataTypes.DECIMAL(10, 2)
        },
        valorCusto: {
          type: DataTypes.DECIMAL(10, 2)
        },
        prazoProducao: {
          type: DataTypes.STRING(255),
        },
        dataCadastro: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        dataAtualizacao: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal(
            "CURRENT_TIMESTAMP"
          ),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "produtos",
        timestamps: true,
        createdAt: "dataCadastro",
        updatedAt: "dataAtualizacao",
      }
    );

    return ProdutoModel;
  }


  static associate(models: any) {

    ProdutoModel.belongsToMany(models.MaterialModel, {
      through: MaterialProdutoModel,
      as: "materiais",
      foreignKey: "produto_id"
    });

    ProdutoModel.hasMany(models.MaterialProdutoModel, {
      foreignKey: "produto_id",
      as: "materiais_produtos"
    })
  }

}
