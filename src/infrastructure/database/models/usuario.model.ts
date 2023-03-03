import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class UsuarioModel extends Model<
  InferAttributes<UsuarioModel>,
  InferCreationAttributes<UsuarioModel>
> {
  declare id: CreationOptional<string>;
  declare nome: string | null;
  declare email: string | null;
  declare password: string | null;
  declare dataCadastro: CreationOptional<Date | null>;
  declare dataAtualizacao: CreationOptional<Date | null>;

  static initModel(sequelize: Sequelize): typeof UsuarioModel {
    UsuarioModel.init(
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
        email: {
          type: DataTypes.STRING(255),
        },
        password: {
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
        tableName: "usuarios",
        timestamps: true,
        createdAt: "dataCadastro",
        updatedAt: "dataAtualizacao",
      }
    );

    return UsuarioModel;
  }
}
