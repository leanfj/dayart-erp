'use strict';
const DataTypes = require('sequelize').DataTypes
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'materiais_produtos', 
      'unidade_medida_id', 
      {
        type: DataTypes.UUID,
        references: {
          model: 'unidade_medidas', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn('materiais_produtos', 'quantidade', DataTypes.DECIMAL(10,2));
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.removeColumn(
      'materiais_produto', 
      'unidade_medida_id' 
    );
    await queryInterface.removeColumn('materiais_produtos', 'quantidade');
  }
};
