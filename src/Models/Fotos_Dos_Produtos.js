import Sequelize, {Model} from "sequelize"

export default class Fotos_Dos_Produtos extends Model{


  static associate(models){

    this.belongsTo(models.Produto, {foreignKey:'PRODUTO_ID'})
  }

  static init(sequelize){

    super.init({

      FILENAME:{

        type: Sequelize.STRING,

        allowNull: false,

        validate:{

          notEmpty:{

            msg: "O CAMPO FILENAME NÃO PODE ESTAR VAZIO"
          }
        }
      },

      PRODUTO_ID:{

        type: Sequelize.INTEGER,

        allowNull: false,

        references:{
          model:'Produto',

          key: 'id',


        }
      }
    },{

      sequelize,
      tableName: 'Fotos_Dos_Produtos'
    })
  }
}
