import Sequelize, { Model } from 'sequelize'

import bcrypt from 'bcrypt'

import dotenv from 'dotenv';

dotenv.config();

export default class Usuario extends Model {

  // VAMOS CRIAR UM METODO DE INSTANCIA DA CLASSE USUARIO PARA PERMITIR A VERIFICACAO DA PASSWORD
  passwordisValid(password) {

    return bcrypt.compare(password, this.Senha)
  }

  static associate(models){

    this.hasMany(models.Carrinho, { foreignKey: 'Usuario_ID', as: 'carrinhos'})
  }

  // Vamos associar um usuario a um carrinho

  static init(sequelize) {

    super.init({

      Nome: {

        type: Sequelize.STRING,

        allowNull: false,

        validate: {

          len: {

            args: [3, 100],

            msg: "O NOME DEVE TER ENTRE 3 E 20CARACTERES"
          },

          notEmpty: {

            msg: "O CAMPO NOME NÃO PODE ESTAR VAZIO"
          }
        },
      },

      Senha: {

        type: Sequelize.STRING,

        allowNull: false,

        validate: {

          len: {

            args: [5, 150],

            msg: "A SENHA DEVE TER ENTRE 5 E 45 CARACTERES"
          },

          notEmpty: {

            msg: "O CAMPO SENHA NÃO PODE ESTAR VAZIO"
          }
        }
      },



      Telefone: {

        type: Sequelize.STRING,

        allowNull: false,

        unique: {

          msg: "NÚMERO DE TELEFONE JÁ REGISTRADO"

        },

        validate: {


          notEmpty: {

            msg: "O CAMPO TELEFONE NÃO PODE ESTAR VAZIO"
          },


        }
      }

    }, {

      sequelize,

      tableName: 'Usuario'

    });

    this.addHook('beforeSave', async (Usuario) => {


      // Para que a senha não se altere automaticamente sempre que fizermos o update de alguma nova informacao sobre o usuario
      if (Usuario.changed('Senha')) {


        Usuario.Senha = await bcrypt.hash(Usuario.Senha, 8);
      }
    })

    return this
  }



}
