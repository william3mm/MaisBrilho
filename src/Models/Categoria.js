import Sequelize, {Model} from 'sequelize'



export default class Categoria extends Model{


  // static associate(models){

  //   this.hasMany(models.Produto, {foreignKey:'CATEGORIA_ID'})
  // }
  static init(sequelize){

    super.init({


      NOME: {

        type: Sequelize.STRING,

        allowNull: false,


        validate: {

          len:{

            args: [3,100],

            msg: "O CAMPO NOME DEVE TER ENTRE 3 E 100 CARACTERES"
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
