'use strict';
const DataTypes = require('sequelize').DataTypes
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('unidade_medidas', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
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
        field: 'data_cadastro',
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      dataAtualizacao: {
        type: "TIMESTAMP",
        field: 'data_atualizacao',
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP"
        ),
        onUpdate : Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('unidade_medidas');
  }
};
