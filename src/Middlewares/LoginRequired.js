
import jwt from 'jsonwebtoken'

import Usuario from '../Models/Usuario';

export default async (req,res,next) =>{

const {authorization} = req.headers; //Capturamos o token nas headers

if(!authorization){

  return res.status(401).json({

    errors: [ 'SEM PERMISSAO']
  });
}

console.log(authorization)


const [_ ,  token] = authorization.split(' '); //Separamos o texto Bearer do texto do token


try {

  // Vamos verificar se o token enviado é valido

  const dados = jwt.verify(token, process.env.TOKEN_SECRET);

  const {id,EMAIL} = dados; // Passamos no token o payload id e EMAIL e agora obtemos eles aqui

  // Vamos verificar se o id e o EMAIL ainda correspondem ao mesmo usuário


  const usuario = await Usuario.findOne({

    where:{

      id,

      EMAIL
    }
  })

  if(!usuario){

    return res.status(401).json({

      errors: ['Usuário Inválido']
    })
  }

  // Vamos pegar o id e o email do usuario quando ele fizer a requisicao
  req.userID = id;

  req.userEmail = EMAIL;




  // console.log(id,EMAIL)

  next();

} catch (error) {

  console.log(error);
  return res.status(400).json({

    erro: ['Login Required']})

}




}
