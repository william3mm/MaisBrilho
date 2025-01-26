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


      console.log(e.message)

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

      res.status(400).json({

        erro: e.errors.map(err => err.message)})
      console.log(e.message)

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
  console.log(e.message)

  }
  }


}


export default new ProdutoController();
