'use strict';
const DataTypes = require('sequelize').DataTypes
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('materiais_produtos_unidades_medidas', 'preco', DataTypes.DECIMAL(10,2));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('materiais_produtos_unidades_medidas', 'preco');
  }
};
