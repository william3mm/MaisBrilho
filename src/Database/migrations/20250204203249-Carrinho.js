'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('Carrinho',


      { id: {

        type: Sequelize.INTEGER,

        allowNull: false,

        autoIncrement: true,

        primaryKey: true
      },

      QUANTIDADE_ADICIONADA:{

        type: Sequelize.INTEGER,

        allowNull:true
      },

      VALOR_TOTAL:{

        type: Sequelize.DECIMAL(10,2),

        allowNull: true
      },

      PRODUTO_ID:{

        allowNull: true,

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE'
,
        references:{

          model: 'Produto',

          key: 'id'
        }
      },

      USUARIO_ID:{

        allowNull: false,

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE',

        references: {

          model: 'Usuario',

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


      }


      );

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.dropTable('Carrinho');

  }
};
