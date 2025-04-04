import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config();

import Vendedor from '../../Models/Vendedor'


export default async function TokenGenerator(req,res){

 // VAMOS PEGAR OS VALORES DO EMAIL E DA SENHA E VERIFICAR SE ELES SÃO IGUAIS AOS VALORES DO Vendedor NA BASE DE DADOS

 try {


  const  {Email , Senha } = req.body;


  if(!Email || !Senha){

    return res.status(400).json("EMAIL OU SENHA NÃO ENVIADOS")
  }
  const vendedor = await Vendedor.findOne({

    where: {

      Email,

    }
  })


  if(!vendedor){

    return res.status(401).json({

      errors: ['Vendedor não existe']
    })
  }


  if(!(await vendedor.passwordisValid(Senha))){

    return res.status(401).json({

     sucess:false, message: 'SENHA INVÁLIDA'
    })
  }

  // CASO O Vendedor SEJA AUTENTICADO VAMOS GERAR UM TOKEN PARA ELE


  const {id}= vendedor

  // O PRIMEIRO ARGUMENTO QUE É O PAYLOAD SE REFERE AOS DADOS QUE IRÃO IDENTIFICAR O Vendedor, NO CASO O SEU ID
  const token =  jwt.sign({ id}, process.env.TOKEN_SECRET_VENDEDOR , {

    // NO TERCEIRO PARAMETRO PASSAMOS QUANDO O TOKEN VAI EXPIRAR

    expiresIn: process.env.TOKEN_EXPIRATION_VENDEDOR
  })

  return res.json({token, vendedor: { id}})

 } catch (error) {

  console.log(error);

  return res.status(400).json('ERRO AO GERAR O TOKEN')

 }

}




