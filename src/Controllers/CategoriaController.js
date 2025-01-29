import Categoria from '../Models/Categoria'


class CategoriaController{


 async  index(req,res){

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

      return res.status(401).json({

        errors: ['ERRO AO CRIAR CATEGORIA']
      })

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
    return res.status(401).json({

      errors: ['ERRO AO DELETAR CATEGORIA']
    })


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

      return res.status(401).json({

        errors: ['ERRO AO ACTUALIZAR CATEGORIA']
      })

    }

  }

}

export default new CategoriaController();
