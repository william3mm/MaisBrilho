'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up (queryInterface, Sequelize) {

     await queryInterface.addIndex('Produto', ['Nome'], {

      type: 'FULLTEXT',

      name: 'nome_full_text_index',
     });

  },
// eslint-disable-next-line no-unused-vars
  async down (queryInterface, Sequelize) {

    await queryInterface.removeIndex('Produto', 'nome_fulltext_index');

  }
};
