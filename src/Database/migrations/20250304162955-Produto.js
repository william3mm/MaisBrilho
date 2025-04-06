/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produto', {

      id: {

        type: Sequelize.INTEGER,

        allowNull: false,

        primaryKey: true,

        autoIncrement: true,
      },

      Nome: {

        type: Sequelize.STRING(255),

        allowNull: false,

      },

      Quantidade: {

        type: Sequelize.INTEGER,

        allowNull: false,
      },

      Preco: {

        type: Sequelize.DECIMAL(10, 2),

        allowNull: false,
      },

      Codigo: {

        type: Sequelize.STRING,

        allowNull: true,

      },

      Descricao: {

        type: Sequelize.TEXT,

        allowNull: false,

        validate: {

          len: [ 1, 1000 ],
        },
      },

      Categoria_ID: {

        type: Sequelize.INTEGER,

        allowNull: false,

        references: {

          model: 'Categoria',

          key: 'id',
        },

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE',
      },

      createdAt: {

        type: Sequelize.DATE,

        allowNull: false,
      },

      updatedAt: {

        type: Sequelize.DATE,

        allowNull: false,
      },

    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produto');
  },
};
