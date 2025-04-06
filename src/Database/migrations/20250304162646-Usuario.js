/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', {

      id: {

        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true,

        allowNull: false,

      },

      Nome: {

        type: Sequelize.STRING,

        allowNull: false,
      },

      Senha: {

        type: Sequelize.STRING,

        allowNull: false,
      },

      Telefone: {

        type: Sequelize.STRING,

        allowNull: false,

        unique: true,
      },

      Email: {

        type: Sequelize.STRING,

        allowNull: true,

        unique: true,
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
    await queryInterface.dropTable('Usuario');
  },
};
