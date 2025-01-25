'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('Categoria',


      { id:{

        type: Sequelize.INTEGER,

        allowNull: false,

        primaryKey: true,

        autoIncrement: true


      },

      NOME:{

        type: Sequelize.STRING,

        allowNull: false,

        unique: true



      },

      createdAt:{

        type: Sequelize.DATE,

        allowNull: false
       },

       updatedAt:{

        type: Sequelize.DATE,

        allowNull: false
       }


      });

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('Categoria');

  }
};
