import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class MaterialModel extends Model<
  InferAttributes<MaterialModel>,
  InferCreationAttributes<MaterialModel>
> {
  declare id: CreationOptional<string>;
  declare titulo: string | null;
  declare descricao: string | null;
  declare codigo: string | null;
  declare valor: number | null;
  declare unidadeMedida: string | null;
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
        valor: {
          type: DataTypes.DECIMAL(10, 2)
        },
        unidadeMedida: {
          type: DataTypes.DECIMAL(10, 2)
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
        tableName: "materiais",
        timestamps: true,
        createdAt: "dataCadastro",
        updatedAt: "dataAtualizacao",
      }
    );

    return MaterialModel;
  }
}
