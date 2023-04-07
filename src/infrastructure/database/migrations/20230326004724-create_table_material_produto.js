'use strict';
const DataTypes = require('sequelize').DataTypes
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('materiais_produtos', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      material_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'materiais', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      produto_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'produtos', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('materiais_produtos');
  }
};
