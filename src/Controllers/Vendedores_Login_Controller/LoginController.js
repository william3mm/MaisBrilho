

import dotenv  from 'dotenv';

dotenv.config()


import Token_Generator from '../Vendedor_TokenController/Token_Generator_Vendedor';

class LoginController{

  async login(req,res){


    try {


      return Token_Generator(req,res);

    } catch (error) {
      console.error(error);

      const mensagemDeErro = error.errors?.map(err => err.message) || [ 'Erro AO FAZER LOGIN']
      return res.status(400).json({sucess: false, messages: mensagemDeErro})
    }

  }


}


export default new LoginController()
