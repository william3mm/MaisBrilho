
import jwt from 'jsonwebtoken'

export default async (req,res,next) =>{

const {authorization} = req.headers; //Capturamos o token nas headers

if(!authorization){

  return res.status(401).json({

    errors: [ 'SEM PERMISSAO']
  });
}


// eslint-disable-next-line no-unused-vars
const [_ ,  token] = authorization.split(' '); //Separamos o texto Bearer do texto do token


try {

  // Vamos verificar se o token enviado é valido

  const dados = jwt.verify(token, process.env.TOKEN_SECRET_VENDEDOR );

  const {id} = dados; // Passamos no token o payload id e Nome e agora obtemos eles aqui

  // Vamos verificar se o id e o Nome ainda correspondem ao mesmo usuário


  // Vamos pegar o id e o email do usuario quando ele fizer a requisicao
  req.userID = id;

  next();

} catch (error) {

  const mensagemDeErro = error.errors?.map(err => err.message) || [ 'SEM PERMISSÃO']

  return res.status(401).json({success: false, messages: mensagemDeErro})

}

}
