import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class ClienteModel extends Model<
  InferAttributes<ClienteModel>,
  InferCreationAttributes<ClienteModel>
> {
  declare id: CreationOptional<string>;
  declare nome: string | null;
  declare email: string | null;
  declare genero: string | null;
  declare telefone: string | null;
  declare endereco: string | null;
  declare cidade: string | null;
  declare estado: string | null;
  declare dataCadastro: CreationOptional<Date | null>;
  declare dataAtualizacao: CreationOptional<Date | null>;

  static initModel(sequelize: Sequelize): typeof ClienteModel {
    ClienteModel.init(
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
        genero: {
          type: DataTypes.STRING(255),
        },
        telefone: {
          type: DataTypes.STRING(255),
        },
        endereco: {
          type: DataTypes.STRING(255),
        },
        cidade: {
          type: DataTypes.STRING(254),
        },
        estado: {
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
        tableName: "cliente",
        timestamps: true,
        createdAt: "dataCadastro",
        updatedAt: "dataAtualizacao",
      }
    );

    return ClienteModel;
  }
}
