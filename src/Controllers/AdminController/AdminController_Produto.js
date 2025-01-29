import ProdutoController from  '../ProdutoController'




class AdminController{


  // O Admin vai poder criar os produtos vamos realizar isto aqui


  async create_produto(req,res){

    try {


      return ProdutoController.create(req,res);

    } catch (error) {

      console.log(error)

      return res.status(400).json({

        errors: ['ERRO AO CRIAR PRODUTO']
      })

    }

  }

  async update_produto(req,res){

    try {


      return ProdutoController.update(req,res)

    } catch (error) {

      console.log(error)

      return res.status(400).json({

        errors: ['ERRO AO CRIAR PRODUTO']
      })

    }
  }

  async delete(req,res){

    try {

      return ProdutoController.delete(req,res);

    } catch (error) {

      console.log(error)

      res.status(400).json({

        errors: ['ERRO AO DELETAR USUÁRIO']
      })

    }
  }

  async index(req,res){

    try {

       return  ProdutoController.index(req,res)
    } catch (error) {

      console.log(error)

      res.status(400).json({

        errors: [ 'ERRO AO LISTAR PRODUTOS']
      })

    }

  }

  async show(req,res){

    try {

      return ProdutoController.show(req,res)

    } catch (error) {

      console.log(error)

      res.status(400).json({

        errors: [ 'ERRO AO ENCONTRAR PRODUTO']
      })

    }
  }




}

export default new AdminController();
