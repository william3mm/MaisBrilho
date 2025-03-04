'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('Categoria', {



        id:{

          type: Sequelize.INTEGER,

          allowNull: false,

          primaryKey: true,

          autoIncrement: true
        },

        Nome:{

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



      });

  },
// eslint-disable-next-line no-unused-vars
  async down (queryInterface, Sequelize) {

      await queryInterface.dropTable('Categoria');

  }
};
