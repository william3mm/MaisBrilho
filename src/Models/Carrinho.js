import Sequelize, {Model} from 'sequelize'

export default class Carrinho extends Model{



  static associate(models){



    this.belongsTo(models.Usuario, {foreignKey: 'USUARIO_ID'});

    this.belongsToMany(models.Produto, {through: 'Carrinho_Produto', foreignKey: 'CARRINHO_ID'})
  }

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
