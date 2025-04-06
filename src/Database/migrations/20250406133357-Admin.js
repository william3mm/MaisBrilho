/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admin', {

      id: {

        type: Sequelize.INTEGER,

        allowNull: false,

        primaryKey: true,

        autoIncrement: true,
      },

      Nome: {

        type: Sequelize.STRING,

        allowNull: false,
      },

      Email: {

        type: Sequelize.STRING,

        allowNull: false,

        unique: true,
      },

      Senha: {

        type: Sequelize.STRING,

        allowNull: false,
      },

      Telefone: {

        type: Sequelize.INTEGER,

        allowNull: false,

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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Admin');
  },
};
