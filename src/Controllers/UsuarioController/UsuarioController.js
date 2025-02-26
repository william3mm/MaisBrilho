import Usuario from "../../Models/Usuario";

import CarrinhoController from "../CarrinhoController/CarrinhoController";

class UsuarioController{


  async index(req,res){

   return CarrinhoController.index(req,res);


  }

  async create(req,res){

    // Aqui vamos criar um usuário

    if(!req.body) res.json("NENHUM DADO ENVIADO")
    try {

      const {NOME, EMAIL, SENHA} = req.body;
      const usuario = await Usuario.create({NOME, EMAIL, SENHA})


      res.json(usuario)

    } catch (e) {

      res.status(400).json({

        errors: [ 'ERRO AO CRIAR USUÁRIO']})
      console.log(e.message)

    }


  }

  async delete(req,res){

    // Aqui vamos deletar usuarios


    try {

      // Vamos pegar o valor do id do usuário que estamos a tentar deletar capturando o id pelo parametro da requisicao

      const usuario =  await Usuario.findByPk(req.userID);

      // Verificamos se o usuário existe na base de dados
      if(!usuario) res.status(400).json("USUARIO NÃO ENCONTRADO")


      usuario.destroy();

      res.json("USUÁRIO DELETADO COM SUCESSO")

    } catch (e) {

      console.log(e.message)
      // Pegamos o erro a partir de um array que nos é retornado sempre que há uma exception
      return res.status(400).json({

        errors: ['ERRO AO DELETAR USUÁRIO']})

    }

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

      // Vamos permitir que o usuário troque apenas o seu nome e email

      const {NOME, EMAIL,SENHA} = req.body
      const novos_dados = await usuario.update({ NOME, EMAIL, SENHA})

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
