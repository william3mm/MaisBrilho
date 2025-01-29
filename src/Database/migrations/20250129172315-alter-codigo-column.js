module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Produto', 'CODIGO', {
      type: Sequelize.STRING,
      allowNull: true,  // Agora o campo CODIGO pode ser NULL
    });
  },

  async down(queryInterface, Sequelize) {
    // Caso precise reverter a alteração
    await queryInterface.changeColumn('Produto', 'CODIGO', {
      type: Sequelize.STRING,
      allowNull: false,  // Retorna a restrição para não permitir NULL
    });
  }
};
