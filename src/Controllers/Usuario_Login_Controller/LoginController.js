import Usuario from "../../Models/Usuario";

import TokenGenerator from "../Usuario_TokenController/Token_Generator_Usuario";
class LoginController{


  async index(req,res){

    try {

      const usuario =  await Usuario.findAll();

      return res.json(usuario)
    } catch (error) {

      console.log(error);

      return res.status(404).json('ERRO AO LISTAR USUARIOS')
    }


  }
  async login(req,res){

    // Vamos capturar os dados do corpo da requisicao

    try {

      return TokenGenerator(req,res);



    } catch (error) {

      console.log(error);

      const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO FAZER LOGIN']
      return res.status(404).json({sucess: false, messages: mensagemDeErro})
    }


  }
}

export default new LoginController();
