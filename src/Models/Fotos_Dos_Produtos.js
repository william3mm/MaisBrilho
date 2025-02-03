import Sequelize, {Model} from "sequelize"

export default class Fotos_Dos_Produtos extends Model{


  static associate(models){

    this.belongsTo(models.Produto, {foreignKey:'PRODUTO_ID'})
  }

  static init(sequelize){

    super.init({

      filename:{

        type: Sequelize.JSON,

        allowNull: false,


      },

      originalname:{

        type: Sequelize.JSON,

        allowNull: false,


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
