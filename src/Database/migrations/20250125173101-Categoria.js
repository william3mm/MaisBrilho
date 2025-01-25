'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('Categoria',


      { id:{

        type: Sequelize.INTEGER,

        allowNull: false,



        primaryKey: true // O nome da categoria será a primary key
      },

      NOME:{

        type: Sequelize.STRING,

        allowNull: false,

        unique: true



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

     await queryInterface.dropTable('Categoria');

  }
};
