import Sequelize, { Model } from 'sequelize';

export default class Carrinho_Produto extends Model {
  static init(sequelize) {
    super.init({

      Carrinho_ID: {

        type: Sequelize.INTEGER,

        allowNull: false,

        references: {

          model: 'Carrinho',

          key: 'id',

        },

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE',
      },

      Produto_ID: {

        type: Sequelize.INTEGER,

        allowNull: false,

        references: {

          model: 'Produto',

          key: 'id',
        },

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE',
      },

      Quantidade_Adicionada: {

        type: Sequelize.INTEGER,

        allowNull: false,

        defaultValue: 1,

        validate: {

          min: 1,
        },
      },

      Valor_Total_Item: {

        type: Sequelize.DECIMAL(10, 2),

        allowNull: false,

        defaultValue: 0.00,
      },

    }, {

      sequelize,

      tableName: 'Carrinho_Produto',
    });

    return this;
  }
}
