import Sequelize, {Model} from 'sequelize'

export default class Carrinho extends Model{




  static init(sequelize){

    super.init({


      QUANTIDADE_ADICIONADA: {

        type: Sequelize.INTEGER,

        allowNull: true
      },

      VALOR_TOTAL: {

        type: Sequelize.DECIMAL(10,2),

        allowNull: true
      },

      PRODUTO_ID:{

        type: Sequelize.INTEGER,

        allowNull: true,

        references:{

          model: 'Produto',

          key: 'id'
        }
      },

      USUARIO_ID:{

        type: Sequelize.INTEGER,

        allowNull: false,

        references:{

          model: 'Usuario',

          key: 'id'
        }
      }
    },

      {

        sequelize,

        tableName: 'Carrinho'
      })

return this;
  }
}
