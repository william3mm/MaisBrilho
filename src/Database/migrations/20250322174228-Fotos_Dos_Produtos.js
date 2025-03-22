'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('Fotos_Dos_Produtos',

      { id: {

        type: Sequelize.INTEGER,

        allowNull: false,

        primaryKey: true,

        autoIncrement: true
      },

      Filename:{

        type: Sequelize.JSON,

        allowNull: false
      },

      Originalname:{

        type: Sequelize.JSON,

        allowNull: false
      },

      Produto_ID:{

        type: Sequelize.INTEGER,

        allowNull: false,

        references:{

          model: 'Produto',

          key: 'id',


        },
        onDelete: 'CASCADE',

        onUpdate: 'CASCADE'

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

  async down (queryInterface, ) {

      await queryInterface.dropTable('Fotos_Dos_Produtos');

  }
};
