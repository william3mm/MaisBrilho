import Categoria from '../Models/Categoria'


class CategoriaController{


 async index(req,res){

    const categoria =  await Categoria.findAll();

    res.json(categoria)
  }

  async create(req,res){

    // Vamos tentar criar uma categoria

    try {

      if(!req.body){

        res.json("NENHUM DADO ENVIADO")
      }

      const categoria = await Categoria.create(req.body)

      res.json(categoria)

    } catch (e) {

      res.status(400).json({

        erro: e.errors.map(err => err.message)})
      console.log(e.message)

    }
  }

  async delete(req,res){


    try{
    if(!req.params.id){

      res.json("NENHUM DADO ENVIADO")
    }

    const categoria  = await Categoria.findByPk(req.params.id);

    if(!categoria){

      res.json("CATEGORIA NÃO ENCONTRADA")
    }

    categoria.destroy();

    res.json("CATEGORIA DELETADA COM SUCESSO")

  } catch(e){
    res.status(400).json({

      erro: e.errors.map(err => err.message)})
    console.log(e.message)


    }
  }

  async update(req,res){

    try {
      if(!req.params.id){

        res.json("NENHUM PARAMETRO ENVIADO")
      }

      const categoria =  await Categoria.findByPk(req.params.id);

      if(!categoria){

        res.json("CATEGORIA NÃO ENCONTRADA")
      }

      const novos_dados = await categoria.update(req.body);

      res.json(novos_dados)

    } catch (e) {

      res.status(400).json({

        erro: e.errors.map(err => err.message)})
      console.log(e.message)

    }

  }


}

export default new CategoriaController();
