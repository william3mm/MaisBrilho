import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcrypt';

export default class Admin extends Model {
  // VAMOS CRIAR UM METODO DE INSTANCIA DA CLASSE USUARIO PARA PERMITIR A VERIFICACAO DA PASSWORD
  passwordisValid(password) {
    return bcrypt.compare(password, this.SENHA);
  }

  static init(sequelize) {
    super.init({

      Nome: {

        type: Sequelize.STRING,

        allowNull: false,

        validate: {

          len: {

            args: [ 3, 20 ],

            msg: [ 'O CAMPO NOME DEVE TER ENTRE 3 A 15 CARACTERES' ],
          },

          notEmpty: {

            msg: [ 'O CAMPO NOME NÃO PODE ESTAR VAZIO' ],
          },
        },
      },

      Email: {

        type: Sequelize.STRING,

        allowNull: false,

        validate: {

          isEmail: {

            msg: [ 'EMAIL INVÁLIDO' ],
          },

          notEmpty: {

            msg: [ ' O CAMPO EMAIL NÃO PODE ESTAR VAZIO' ],
          },
        },
      },

      Telefone: {

        type: Sequelize.INTEGER,

        allowNull: false,

        validate: {

          notEmpty: {

            msg: [ 'O CAMPO TELEFONE NÃO PODE ESTAR VAZIO' ],
          },
        },

      },

      Senha: {

        type: Sequelize.STRING,

        allowNull: false,

        validate: {

          notEmpty: {

            msg: [ 'O CAMPO SENHA NÃO PODE ESTAR VAZIO' ],
          },

          // // Vamos fazer com que senha obrigatório incluir pelo menos um simbolo ou um caracter no campo senha
          isValid(valor) {
            const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]*$/;

            if (!regex.test(valor)) {
              throw new Error('O CAMPO SENHA DEVE CONTER PELO MENOS UM SÍMBOLO OU CARACTERE ESPECIAL');
            }
          },

        },
      },
    }, {

      sequelize,
      tableName: 'Admin',
    });

    this.addHook('beforeSave', async (Admin) => {
      if (Admin.changed('Senha')) {
        Admin.Senha = await bcrypt.hash(Admin.Senha, 8);
      }
    });
    return this;
  }
}
