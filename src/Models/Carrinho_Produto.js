import Sequelize, {Model}from "sequelize";

export default class Carrinho_Produto extends Model{


  static init (sequelize){

    super.init({


      CARRINHO_ID:{

        type: Sequelize.INTEGER,

        allowNull: false,

        references:{

          model: 'Carrinho',

          key: 'id'

        },

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE',
      },

      PRODUTO_ID:{

        type: Sequelize.INTEGER,

        allowNull: false,

        references: {

          model: 'Produto',

          key: 'id'
        },

        onDelete: 'CASCADE',

        onUpdate: 'CASCADE'
      }



    }, {

      sequelize,

      tableName: 'Carrinho_Produto'
    })

    return this
  }

}
