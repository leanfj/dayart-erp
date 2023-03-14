'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('materiais', 'quantidade', Sequelize.DECIMAL(10,2));
    await queryInterface.addColumn('materiais', 'valor_unitario', Sequelize.DECIMAL(10,2));

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('materiais', 'quantidade');
    await queryInterface.removeColumn('materiais', 'valor_unitario');
  }
};
