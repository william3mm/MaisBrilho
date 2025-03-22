'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    await queryInterface.sequelize.query(`ALTER TABLE Produto ADD FULLTEXT(Nome)`)
  },

  async down (queryInterface) {


    await queryInterface.sequelize.query(`ALTER TABLE Produto DROP INDEX Nome`)

    await queryInterface.dropTable('Produto')
  }
};
