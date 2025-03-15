'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('Produto_Vendedor',

      { id: {

        type: Sequelize.INTEGER,

        allowNull: false,

        primaryKey: true,

        autoIncrement: true
      },

      Produto_ID:{

        type: Sequelize.INTEGER,

        references:{

          model: 'Produto',

          key: 'id'
        },

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE',

        allowNull: false
      },

      Ativo:{

        type: Sequelize.BOOLEAN,

        defaultValue: true
      },

      Desconto:{

        type: Sequelize.DECIMAL(5,2),

        defaultValue: 0.00
      },

      Vendedor_ID:{

        type: Sequelize.INTEGER,

        references:{

          model: 'Vendedor',

          key: 'id'
        },

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE',

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

  async down (queryInterface) {

     await queryInterface.dropTable('Produto_Vendedor');

  }
};
