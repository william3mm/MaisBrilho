import Sequelize, { Model } from 'sequelize';

export default class Produto_Vendedor extends Model {
  static associate(models) {
    this.belongsTo(models.Produto, { foreignKey: 'Produto_ID', as: 'produto' });

    this.belongsTo(models.Vendedor, { foreignKey: 'Vendedor_ID', as: 'vendedor' });
  }

  // Vamos criar um metodo de instancia para gerar um codigo para o produto

  static init(sequelize) {
    super.init({

      Produto_ID: {

        type: Sequelize.INTEGER,

        references: {

          model: 'Produto',

          key: 'id',
        },

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE',

        allowNull: false,
      },

      Ativo: {

        type: Sequelize.BOOLEAN,

        defaultValue: true,
      },

      Desconto: {

        type: Sequelize.DECIMAL(5, 2),

        defaultValue: '0.00',
      },

      Vendedor_ID: {

        type: Sequelize.INTEGER,

        references: {

          model: 'Vendedor',

          key: 'id',
        },

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE',

        allowNull: false,

      },

    }, {

      sequelize,

      tableName: 'Produto_Vendedor',

      modelName: 'Produto_Vendedor',

    });

    return this;
  }
}
