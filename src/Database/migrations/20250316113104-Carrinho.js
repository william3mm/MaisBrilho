'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('Carrinho',

      { id: {

        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true,

        allowNull: false
      },

      Usuario_ID:{

        type: Sequelize.INTEGER,

        allowNull: false,


        references: {

          model: 'Usuario',

          key: 'id',

         onDelete: 'CASCADE',

        onUpdate: 'CASCADE',
        },


      },

      Valor_Total: {

        type: Sequelize.DECIMAL(10,2),

        allowNull: false,

        defaultValue: 0.00
      },

      Status: {

        type: Sequelize.STRING,

        allowNull: false,

        defaultValue: 'aberto'
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

  async down (queryInterface) {

      await queryInterface.dropTable('Carrinho');

  }
};
