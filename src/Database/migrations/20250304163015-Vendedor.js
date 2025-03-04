'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('Vendedor', {


        id: {

          type: Sequelize.INTEGER,

          allowNull: false,

          primaryKey: true,

          autoIncrement:  true
        },

        Nome:{

          type: Sequelize.STRING,

          allowNull: false
        },

        Email:{

          type: Sequelize.STRING,

          allowNull: false,

          unique: true

        },

        Telefone:{

          type: Sequelize.STRING,

          allowNull: false,

          unique: true
        },

        Status:{

          type: Sequelize.STRING,

          defaultValue: 'pendente',

          allowNull: false
        },

        Senha:{

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

      await queryInterface.dropTable('Vendedor');

  }
};
