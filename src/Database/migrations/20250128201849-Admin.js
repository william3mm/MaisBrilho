'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('Admin',

     { id: {

      type: Sequelize.INTEGER,

      primaryKey: true,

      allowNull: false,

      autoIncrement: true
     },

     NOME:{


      type: Sequelize.STRING,

      allowNull: false
     },

     EMAIL:{

      type: Sequelize.STRING,

      allowNull: false,

     },

     SENHA:{

      type: Sequelize.STRING,

      allowNull: false
     },

     createdAt:{

      type: Sequelize.DATE,

      allowNull: false
     },

     updatedAt:{

      type: Sequelize.DATE,

      allowNull: false
     }


    }



     );

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('Admin');

  }
};
