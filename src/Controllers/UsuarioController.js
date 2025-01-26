
import Usuario from "../Models/Usuario";
class UsuarioController{

  async index(req,res){


    const usuario = await Usuario.findAll();
    res.json(usuario)


  }

  async create(req,res){

    // Aqui vamos criar um usuário

    if(!req.body) res.json("NENHUM DADO ENVIADO")
    try {

      const usuario = await Usuario.create(req.body)


      res.json(usuario)

    } catch (e) {

      res.status(400).json({

        erro: [ 'ERRO AO CRIAR USUÁRIO']})
      console.log(e.message)

    }


  }

  async delete(req,res){

    // Aqui vamos deletar usuarios

    if(!req.body) res.json("NENHUM DADO ENVIADO")

    try {

      // Vamos pegar o valor do id do usuário que estamos a tentar deletar capturando o id pelo parametro da requisicao

      const usuario =  await Usuario.findByPk(req.params.id);

      // Verificamos se o usuário existe na base de dados
      if(!usuario) res.status(400).json("USUARIO NÃO ENCONTRADO")


      usuario.destroy();

      res.json("USUÁRIO DELETADO COM SUCESSO")



    } catch (e) {

      console.log(e.message)
      // Pegamos o erro a partir de um array que nos é retornado sempre que há uma exception
      return res.status(400).json({

        erro: ['ERRO AO DELETAR USUÁRIO']})

    }

  }

  async update(req,res){

    // Vamos actualizar os dados dos  usuários



    try {

      if(!req.params.id) {

        return res.json("NENHUM DADO ENVIADO")}

      // Primeiro vamos verificar se o usuário existe na base de dados

      const usuario = await Usuario.findByPk(req.params.id)

      if(!usuario){

        res.json("USUÁRIO NÃO EXISTE")}


      // Vamos permitir que o usuário troque apenas o seu nome e email

      const novos_dados = await usuario.update(req.body)

     return res.json(novos_dados)

    } catch (e) {

      console.log(e)
      return res.status(400).json({

        erro: ['ERRO AO ACTUALIZAR USUÁRIO']})




    }

  }
}

export default new UsuarioController();
