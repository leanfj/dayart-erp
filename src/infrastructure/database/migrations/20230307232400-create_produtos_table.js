'use strict';
const DataTypes = require('sequelize').DataTypes
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      titulo: {
        type: DataTypes.STRING(255),
      },
      descricao: {
        type: DataTypes.STRING(255),
      },
      valor_venda: {
        type: DataTypes.DECIMAL(10, 2),
      },
      valor_custo: {
        type: DataTypes.DECIMAL(10, 2),
      },
      materiais: {
        type: DataTypes.STRING(255),
      },
      prazo_producao: {
        type: DataTypes.STRING(255),
      },
      valor_elo7: {
        type: DataTypes.DECIMAL(10, 2),
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
    await queryInterface.dropTable('produtos');
  }
};
