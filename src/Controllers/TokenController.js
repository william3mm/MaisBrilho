import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config();

import Usuario from '../Models/Usuario'

class TokenController{



  async create(req,res){


    // VAMOS PEGAR OS VALORES DO EMAIL E DA SENHA E VERIFICAR SE ELES SÃO IGUAIS AOS VALORES DO USUARIO NA BASE DE DADOS

    const {EMAIL = '', SENHA= ''} = req.body;


    if(!EMAIL || !SENHA){

      res.status(400).json("EMAIL OU SENHA NÃO ENVIADOS")
    }
    const usuario = await Usuario.findOne({

      where: {

        // WHERE RECEBE CHAVE:VALOR MAS PODEMOS PASSAR APENAS O VALOR

        EMAIL,


      }
    })


    if(!usuario){

      return res.status(401).json({

        errors: ['Usuário não existe']
      })
    }

    // CASO A SENHA FOR INVALIDA VAMOS CRIAR UMA CONDICAO PARA INFORMAR

   usuario.SENHA_VIRTUAL = SENHA


   const senha =  usuario.SENHA_VIRTUAL
    console.log(senha)


    if(!(await usuario.passwordisValid(SENHA))){

      f
    }

    // CASO O USUÁRIO SEJA AUTENTICADO VAMOS GERAR UM TOKEN PARA ELE


    const {id}= usuario

    // O PRIMEIRO ARGUMENTO QUE É O PAYLOAD SE REFERE AOS DADOS QUE IRÃO IDENTIFICAR O USUÁRIO, NO CASO O SEU ID E O EMAIL
    const token =  jwt.sign({ id, EMAIL}, process.env.TOKEN_SECRET, {

      // NO TERCEIRO PARAMETRO PASSAMOS QUANDO O TOKEN VAI EXPIRAR

      expiresIn: process.env.TOKEN_EXPIRATION
    })

    return res.json({token})


  }


}

export default new TokenController();
