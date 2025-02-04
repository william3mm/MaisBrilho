import Sequelize, {Model} from "sequelize";
import appConfig from "../config/appConfig"; // Importamos a appConfig para pegarmos o endereco do localhost



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

      // Vamos utilizar o campo virtual url para gerar um link para podermos visualizar os nossos arquivos
      url:{

        type: Sequelize.VIRTUAL,

        get(){

          return `${appConfig.url}/images/${this.getDataValue('filename')}` // Vamos pegar o valor de filename
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
