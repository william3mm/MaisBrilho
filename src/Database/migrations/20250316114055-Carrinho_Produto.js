/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Carrinho_Produto',

      {
        id: {

          type: Sequelize.INTEGER,

          primaryKey: true,

          autoIncrement: true,

          allowNull: false,
        },

        Carrinho_ID: {

          type: Sequelize.INTEGER,

          allowNull: false,

          references: {

            model: 'Carrinho',

            key: 'id',

            onDelete: 'CASCADE',

            onUpdate: 'CASCADE',

          },

        },

        Produto_ID: {

          type: Sequelize.INTEGER,

          allowNull: false,

          references: {

            model: 'Produto',

            key: 'id',
            onDelete: 'CASCADE',

            onUpdate: 'CASCADE',
          },

        },

        Quantidade_Adicionada: {

          type: Sequelize.INTEGER,

          allowNull: false,

          defaultValue: 1,

        },

        Valor_Total_Item: {

          type: Sequelize.DECIMAL(10, 2),

          allowNull: false,

          defaultValue: 0.00,
        },

        createdAt: {

          type: Sequelize.DATE,

          allowNull: false,
        },

        updatedAt: {

          type: Sequelize.DATE,

          allowNull: false,
        },

      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Carrinho_Produto');
  },
};
