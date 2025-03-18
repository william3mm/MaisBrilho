import Sequelize, {Model} from "sequelize";

import bcrypt from 'bcrypt';

import {Status_Vendedor} from '../config/status'

export default class Vendedor extends Model{


  static associate(models){

    this.belongsToMany(models.Produto, { through: 'Produto_Vendedor', foreignKey: 'Vendedor_ID', as: 'produtos'});


  }
   // VAMOS CRIAR UM METODO DE INSTANCIA DA CLASSE USUARIO PARA PERMITIR A VERIFICACAO DA PASSWORD
    passwordisValid(password) {

      return bcrypt.compare(password, this.Senha)
    }

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

      Email:{

        type: Sequelize.STRING,

        allowNull: false,

        unique:{

          msg: 'EMAIL JÁ REGISTRADO'
        },

        validate:{

          isEmail:{

            msg: [ 'EMAIL INVÁLIDO']
          },


        }
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

      Status:{

        type: Sequelize.STRING,

        allowNull: false,

        defaultValue: 'pendente',

        validate:{

          notEmpty:{

            msg: 'O CAMPO "VERIFICADO" NÃO PODE ESTAR VAZIO'
          },

           isIn: [Status_Vendedor]


        }
      },

      Senha:{

        type: Sequelize.STRING,

        allowNull: false
      }


    }, {

      sequelize,

      tableName: 'Vendedor'
    })


    this.addHook('beforeSave', async(Vendedor)=>{

      if(Vendedor.changed('Senha')){

        Vendedor.Senha = await bcrypt.hash(Vendedor.Senha,8)
      }
    })
    return this
  }
}
