import Usuario from "../../Models/Usuario";

import CarrinhoController from "../CarrinhoController/CarrinhoController";

class UsuarioController{


  async index(req,res){

   return CarrinhoController.index(req,res);


  }


  async update(req,res){

    // Vamos actualizar os dados dos  usuários

    try {


      if(!req.userID) {

        return res.json("ID NÃO ENVIADO")
      }

        const usuario = await Usuario.findByPk(req.userID);
      // Primeiro vamos verificar se o usuário existe na base de dados

      if(!usuario){

        return res.json("USUÁRIO NÃO EXISTE")

      }

      // Vamos permitir que o usuário troque o seu Nome, Telefone e Senha

      const {Nome, Email,Senha} = req.body
      const novos_dados = await usuario.update({ Nome, Email, Senha})

     return res.json(novos_dados)

    } catch (e) {

      console.log(e)
      return res.status(400).json({

        errors: ['ERRO AO ACTUALIZAR USUÁRIO']})

    }
  }

  // Agora iremos adicionar os metodos associados ao carrinho

  async criar_carrinho(req,res){

    return CarrinhoController.create(req,res);
    }


  async listar_carrinho(req,res){

    return CarrinhoController.index(req,res);
  }

  async adicionar_item_ao_carrinho(req,res){


    return CarrinhoController.update(req,res)
  }
}

export default new UsuarioController();
