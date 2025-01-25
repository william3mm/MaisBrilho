import Sequelize, {Model} from 'sequelize'



export default class Categoria extends Model{

  static init(sequelize){

    super.init({


      NOME: {

        type: Sequelize.STRING,

        allowNull: false,


        validate: {

          len:{

            args: [3,100],

            msg: "O NOME DEVE TER ENTRE 3 E 20CARACTERES"
          },

          notEmpty:{

            msg: "O CAMPO NOME NÃO PODE ESTAR VAZIO"
          }
        },
      },







    },{

      sequelize,

      tableName: 'Categoria',

      modelName: 'Categoria'

    });







    return this
  }




}
