import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config();

import Usuario from '../../Models/Usuario';


export default async function TokenGenerator(req,res){

 // VAMOS PEGAR OS VALORES DO EMAIL E DA SENHA E VERIFICAR SE ELES SÃO IGUAIS AOS VALORES DO USUARIO NA BASE DE DADOS

 try {


  const  {Telefone = '', Senha= ''} = req.body;


  if(!Telefone || !Senha){

    return res.status(400).json("NOME OU SENHA NÃO ENVIADOS")
  }
  const usuario = await Usuario.findOne({

    where: {

      // WHERE RECEBE CHAVE:VALOR MAS PODEMOS PASSAR APENAS O VALOR

      Telefone,

    }
  })


  if(!usuario){

    return res.status(401).json({

      errors: ['Usuário não existe']
    })
  }


  if(!(await usuario.passwordisValid(Senha))){

    return res.status(401).json({

      errors: [ 'Senha Inválida']
    })
  }

  // CASO O USUÁRIO SEJA AUTENTICADO VAMOS GERAR UM TOKEN PARA ELE


  const {id}= usuario

  // O PRIMEIRO ARGUMENTO QUE É O PAYLOAD SE REFERE AOS DADOS QUE IRÃO IDENTIFICAR O USUÁRIO, NO CASO O SEU ID E O NOME
  const token =  jwt.sign({ id}, process.env.TOKEN_SECRET_USUARIO, {

    // NO TERCEIRO PARAMETRO PASSAMOS QUANDO O TOKEN VAI EXPIRAR

    expiresIn: process.env.TOKEN_EXPIRATION_USUARIO
  })



  return res.json({token, usuario: { id}})

 } catch (error) {

  console.log(error);

  const mensagemDeErro = error.errors?.map(err => err.message) || [ 'Erro AO FAZER LOGIN']

  return res.status(400).json({sucess:false, messages: mensagemDeErro})

 }




}




