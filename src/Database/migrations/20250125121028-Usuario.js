'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('Usuario',


     { id:{

      type: Sequelize.INTEGER,

      primaryKey: true,

      autoIncrement: true,

      allowNull: false
     },

     NOME: {

      type: Sequelize.STRING,

      allowNull: false
     },

     EMAIL:{

      type: Sequelize.STRING,

      allowNull: false
     },

     SENHA: {

      type: Sequelize.STRING,

      allowNull: false
     },

     createdAt:{

      type: Sequelize.STRING,

      allowNull: false
     },
     updatedAt:{

      type: Sequelize.STRING,

      allowNull: false
     }


    });

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.dropTable('Usuario');

  }
};
