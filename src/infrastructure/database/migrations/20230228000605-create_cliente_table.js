'use strict';
const DataTypes = require('sequelize').DataTypes
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cliente', {
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
      genero: {
        type: DataTypes.STRING(255),
        field: 'genero'
      },
      telefone: {
        type: DataTypes.STRING(255),
        field: 'telefone'
      },
      endereco: {
        type: DataTypes.STRING(255),
        field: 'endereco'
      },
      cidade: {
        type: DataTypes.STRING(254),
        field: 'cidade'
      },
      estado: {
        type: DataTypes.STRING(255),
        field: 'estado'
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
    await queryInterface.dropTable('cliente');
  }
};
