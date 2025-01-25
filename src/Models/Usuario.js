import Sequelize, {Model} from 'sequelize'

import bcrypt from 'bcrypt'

export default class Usuario extends Model{

  static init(sequelize){

    super.init({


      NOME: {

        type: Sequelize.STRING,

        allowNull: false,

        validate: {

          len:{

            args: [3,25],

            msg: "O NOME DEVE TER ENTRE 3 E 20CARACTERES"
          }
        },
      },

        SENHA:{

          type: Sequelize.STRING,

          allowNull: false,

          validate: {

            len:{

              args: [5,45],

              msg: "A SENHA DEVE TER ENTRE 5 E 45 CARACTERES"
            }
          }
     },

        SENHA_VIRTUAL:{

          type: Sequelize.VIRTUAL,
          allowNull:true

        },

        EMAIL:{

          type: Sequelize.STRING,

          allowNull: false,

          validate: {

            isEmail:{

              msg: "POR FAVOR ENVIE UM EMAIL VÁLIDO"
            }
          }
        }





    },{

      sequelize,

      tableName: 'Usuario'

    })

    this.addHook('beforeSave', async (Usuario)=>{

      if(Usuario.SENHA_VIRTUAL){

        Usuario.SENHA = await bcrypt.hash(Usuario.SENHA,10)

      }
    })


    return this
  }



}
