'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Produto', 'CODIGO', {
      type: Sequelize.STRING,
      allowNull: false,  // Garantir que a coluna não permita valores nulos
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Produto', 'CODIGO', {
      type: Sequelize.STRING,
      allowNull: true,  // Remover a restrição NOT NULL caso precise reverter
    });
  }
};
