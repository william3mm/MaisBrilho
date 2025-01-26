import Sequelize, {Model} from 'sequelize'

import bcrypt from 'bcrypt'

import dotenv from 'dotenv';

dotenv.config();

export default class Usuario extends Model{


  // VAMOS CRIAR UM METODO DE INSTANCIA DA CLASSE USUARIO PARA PERMITIR A VERIFICACAO DA PASSWORD
  passwordisValid(password){

    return bcrypt.compare(password, this.SENHA)
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

        SENHA:{

          type: Sequelize.STRING,

          allowNull: false,

          validate: {

            len:{

              args: [5,150],

              msg: "A SENHA DEVE TER ENTRE 5 E 45 CARACTERES"
            },

            notEmpty:{

              msg: "O CAMPO SENHA NÃO PODE ESTAR VAZIO"
            }
          }
     },



        EMAIL:{

          type: Sequelize.STRING,

          allowNull: false,

          unique:{

            msg: "EMAIL JÁ EXISTE"

          },

          validate: {

            isEmail:{

              msg: "EMAIL INVÁLIDO"
            },

            notEmpty:{

              msg: "O CAMPO EMAIL NÃO PODE ESTAR VAZIO"
            }
          }
        }





    },{

      sequelize,

      tableName: 'Usuario'

    });

   this.addHook('beforeSave', async (Usuario) => {


    if(Usuario.SENHA){


      Usuario.SENHA = await bcrypt.hash(Usuario.SENHA,8);
    }


    })


    return this
  }



}
