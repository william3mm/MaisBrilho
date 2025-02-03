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

    filename:{

      type: Sequelize.JSON,

      allowNull: false
    },

     originalname:{

      type: Sequelize.JSON,

      allowNull: false
    },

    PRODUTO_ID:{

      type: Sequelize.INTEGER,

      allowNull: false,

      onDelete: 'CASCADE',

      onUpdate: 'CASCADE',

      references:{

        model: 'Produto',

        key: 'id'
      }
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

     await queryInterface.dropTable('Fotos_Dos_Produtos');

  }
};
