import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import Admin from '../../Models/Admin';

dotenv.config();

class TokenController {
  async create(req, res) {
    // VAMOS PEGAR OS VALORES DO EMAIL E DA SENHA E VERIFICAR SE ELES SÃO IGUAIS AOS VALORES DO USUARIO NA BASE DE DADOS

    const { EMAIL = '', SENHA = '' } = req.body;

    console.log(EMAIL, SENHA);

    if (!EMAIL || !SENHA) {
      return res.status(400).json('EMAIL OU SENHA NÃO ENVIADOS');
    }

    try {
      const admin = await Admin.findOne({

        where: {

          // WHERE RECEBE CHAVE:VALOR MAS PODEMOS PASSAR APENAS O VALOR

          EMAIL,

        },
      });

      if (!admin) {
        return res.status(401).json({

          errors: [ 'Admin não existe' ],
        });
      }

      if (!(await admin.passwordisValid(SENHA))) {
        return res.status(401).json({

          errors: [ 'Senha Inválida' ],
        });
      }

      // CASO O USUÁRIO SEJA AUTENTICADO VAMOS GERAR UM TOKEN PARA ELE

      const { id } = admin;

      // O PRIMEIRO ARGUMENTO QUE É O PAYLOAD SE REFERE AOS DADOS QUE IRÃO IDENTIFICAR O USUÁRIO, NO CASO O SEU ID E O EMAIL
      const token = jwt.sign({ id, EMAIL }, process.env.TOKEN_SECRET_ADMIN, {

        // NO SEGUNDO PARAMETRO PASSAMOS QUANDO O TOKEN VAI EXPIRAR

        expiresIn: process.env.TOKEN_EXPIRATION_ADMIN,
      });

      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ errors: 'ERRO AO GERAR TOKEN' });
    }
  }
}
export default new TokenController();
