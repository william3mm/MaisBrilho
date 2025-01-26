import Sequelize, {Model} from 'sequelize'



export default class Produto extends Model{


  static associate(models){

    this.belongsTo(models.Categoria, {foreignKey: 'CATEGORIA_ID', })

    this.hasMany(models.Fotos_Dos_Produtos, {foreignKey: 'PRODUTO_ID'})
  }
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

        PRECO:{

          type: Sequelize.DECIMAL(10,2),

          allowNull: false,

          validate: {

            isInt:{

              msg: "O CAMPO PRECO NÃO PODE CONTER LETRAS OU SÍMBOLOS"
            },

            notEmpty:{

              msg: "O CAMPO SENHA NÃO PODE ESTAR VAZIO"
            }
          }
     },

        QUANTIDADE:{

          type: Sequelize.INTEGER,

          allowNull: false,

          validate:{


            isDecimal:{

              msg: "O CAMPO QUANTIDADE NÃO PODE CONTER LETRAS OU SÍMBOLOS"
            },

            notEmpty:{

              msg: "O CAMPO QUANTIDADE NÃO PODE ESTAR VAZIO"
            }
          }

        },

        CODIGO:{

          type: Sequelize.STRING,

          allowNull: false,

          unique:{

            msg: "CODIGO JÁ REGISTRADO"

          },

          validate: {


            notEmpty:{

              msg: "O CAMPO CODIGO NÃO PODE ESTAR VAZIO"
            }
          }

        },

        DESCRICAO:{

          type: Sequelize.STRING,

          allowNull: false,

          validate:{

            notEmpty:{

              msg: "O CAMPO QUANTIDADE NÃO PODE ESTAR VAZIO"
            }
          }



        },

        CATEGORIA_ID:{

          type: Sequelize.INTEGER,

          allowNull: false,

          references:{

            model: "CATEGORIA",

            key: "id"
          }
        }








    },{

      sequelize,

      tableName: 'Produto'

    });







    return this
  }




}
