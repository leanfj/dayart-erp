'use strict';
const DataTypes = require('sequelize').DataTypes
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
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
        field: 'nome'
      },
      email: {
        type: DataTypes.STRING(255),
        field: 'email'
      },
      password: {
        type: DataTypes.STRING(255),
        field: 'password'
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
    await queryInterface.dropTable('usuarios');
  }
};
