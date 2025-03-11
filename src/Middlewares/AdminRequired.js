import jwt from 'jsonwebtoken';

import Admin from '../Models/Admin'

export default async(req,res,next)=>{

  const {authorization} = req.headers;


  if(!authorization){

    return res.status(401).json({

      errors: [ 'SEM PERMISSAO']
    });
  }

  // Vamos separar o token da palavra Bearer na requisicao

  // eslint-disable-next-line no-unused-vars
  const [_,token] = authorization.split( ' ');

  try {

    const dados = jwt.verify(token, process.env.TOKEN_SECRET_ADMIN);

    const {id, email} = dados;

    const admin = Admin.findOne({

      where:{

        id,

        email
      }
    })

    if(!admin){

      return res.status(401).json({ errors: ' ADMIN INVÁLIDO'})
    }

    req.adminID = id;

    req.adminEMAIL = email;

    next();

  } catch (error) {


    const mensagemDeErro = error.errors?.map(err => err.message) || [ 'Erro AO FAZER LOGIN']

    return res.status(400).json({success: false, messages: mensagemDeErro})

  }




}
