'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('Carrinho_Produto', {

        id: {

          type: Sequelize.INTEGER,

          allowNull: false,

          autoIncrement: true,

          primaryKey: true
        },

        CARRINHO_ID:{

          type: Sequelize.INTEGER,

          allowNull: false,

          references:{

            model: 'Carrinho',

            key: 'id'
          },

          onDelete: 'CASCADE',

          onUpdate: 'CASCADE'
        },

        PRODUTO_ID:{

          type: Sequelize.INTEGER,

          allowNull: false,

          references:{

            model: 'Produto',

            key: 'id'
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

  async down (queryInterface, Sequelize) {

      await queryInterface.dropTable('Carrinho_Produto');

  }
};
