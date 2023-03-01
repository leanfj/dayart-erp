'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('cliente', 'cep', Sequelize.STRING);
    await queryInterface.addColumn('cliente', 'cpf', Sequelize.STRING);
    await queryInterface.addColumn('cliente', 'dataEvento', Sequelize.DATE);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('cliente', 'cep');
    await queryInterface.removeColumn('cliente', 'cpf');
    await queryInterface.removeColumn('cliente', 'dataEvento');
  }
};
