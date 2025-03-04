import Sequelize, {Model} from "sequelize";


export default class Vendedor extends Model{


  static init(sequelize){

    super.init({


      Nome:{

        type: Sequelize.STRING,

        allowNull: false,

        validate:{

          notEmpty:{

            msg: 'O CAMPO NOME NÃO PODE ESTAR VAZIO'
          }
        },
      },


      Telefone:{

        type: Sequelize.STRING,

        allowNull: false,

        validate: {

          notEmpty: {

            msg: 'O CAMPO TELEFONE NÃO PODE ESTAR VAZIO'
          },

          len: {

            args: [9,13],

            msg: ' NÚMERO DE TELEFONE INVÁLIDO'

          }
        }
      },

      Verificado:{

        type: Sequelize.ENUM('aprovado', 'pendente', 'rejeitado'),

        allowNull: false,

        validate:{

          notEmpty:{

            msg: 'O CAMPO "VERIFICADO" NÃO PODE ESTAR VAZIO'
          }
        }
      },

      Senha:{

        type: Sequelize.STRING,

        allowNull: false
      }


    }, {

      sequelize,
    })


  }
}
