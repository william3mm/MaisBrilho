import Produto from '../Models/Produto'

class ProdutoController{

 async index(req,res){

  const produto = await Produto.findAll();

  res.json(produto)

  }

  async create(req,res){


    try {

      if (!req.body){

        res.json("NENHUM DADO ENVIADO")
      }

      const produto = await Produto.create(req.body);

      res.json(produto)

    } catch (e) {


      return res.status(401).json({

        errors: ['ERRO AO CRIAR PRODUTO']
      })

    }
  }


  async delete(req,res){


    try {

      if(!req.params.id){

        res.json("NENHUM DADO ENVIADO")

      }

      const produto  = await Produto.findByPk(req.params.id)

      if(!produto){

        res.json("NENHUM PRODUTO ENCONTRADO");
      }

      produto.destroy();

      res.json("PRODUTO DELETADO COM SUCESSO")

    } catch (e) {

      return res.status(401).json({

        errors: ['ERRO AO DELETAR PRODUTO']
      })
    }



  }

  async update(req,res){

    try{

    if(!req.params.id){

      res.json("NENHUM DADO ENVIADO")

    }

    const produto = await Produto.findByPk(req.params.id);

    if(!produto){

      res.json("NENHUM PRODUTO ENCONTRADO")
    }

    const novos_dados =  await produto.update(req.body);

    res.json(novos_dados)

  }catch(e){

return res.status(401).json({

        errors: ['ERRO AO ACTUALIZAR PRODUTO']
      })

  }
  }


}


export default new ProdutoController();
