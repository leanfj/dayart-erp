'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'materiais', // name of Source model
      'unidade_medida_id', // name of the key we're adding 
      {
        type: Sequelize.UUID,
        references: {
          model: 'unidade_medidas', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'materiais', // name of Source model
      'unidade_medida_id' // key we want to remove
    );
  }
};
