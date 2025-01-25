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

      tableName: 'Categoria'

    });







    return this
  }

  static associate(models){

    Categoria.hasMany(models.Produto, {

      foreignKey:'CATEGORIA_ID',

      sourceKey: 'id',

      as: "PRODUTO"
    })
  }


}
