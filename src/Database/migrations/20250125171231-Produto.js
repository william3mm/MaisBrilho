'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('Produto',

     { id: {

      type: Sequelize.INTEGER,

      primaryKey: true,

      autoIncrement: true,

      allowNull: false
     },

     NOME:{

      type: Sequelize.STRING,

      allowNull: false
     },

     PRECO: {

      type: Sequelize.DECIMAL(10,2),

      allowNull: false

     },

     QUANTIDADE: {

      type: Sequelize.INTEGER,

      allowNull: false
     },

     DESCRICAO: {

      type: Sequelize.STRING,

      allowNull: false
     },

     CODIGO:{

      type: Sequelize.STRING,

      allowNull: false,

      unique: true


     },

     CATEGORIA_ID:{

      type: Sequelize.INTEGER,

      references:{
        model: "Categoria",

        key: "id" // VAMOS REFERENCIAR A CATEGORIA PELO id
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

    await queryInterface.dropTable('Produto');

  }
};
