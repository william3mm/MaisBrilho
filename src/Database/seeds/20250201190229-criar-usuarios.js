'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      return await queryInterface.bulkInsert('People', [{
       name: 'John Doe',
       isChill: false
      }], {});

  },

  async down (queryInterface, Sequelize) {

  }
};
