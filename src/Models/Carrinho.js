import Sequelize, { Model } from 'sequelize';

import { status_possiveis } from '../config/status_carrinho';

export default class Carrinho extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'Usuario_ID', as: 'usuario' });

    this.belongsToMany(models.Produto, { through: 'Carrinho_Produto', foreignKey: 'Carrinho_ID', as: 'produtos' });
  }

  static init(sequelize) {
    super.init(
      {

        USUARIO_ID: {

          type: Sequelize.INTEGER,

          allowNull: false,

          references: {

            model: 'Usuario',

            key: 'id',
          },
        },

        Valor_Total: {

          type: Sequelize.DECIMAL(10, 2),

          allowNull: true,
        },

        Status: {

          type: Sequelize.STRING,

          allowNull: false,

          defaultValue: 'aberto',

          validate: {

            isIn: [ status_possiveis ],
          },
        },

      },

      {

        sequelize,

        tableName: 'Carrinho',
      },
    );

    return this;
  }
}
