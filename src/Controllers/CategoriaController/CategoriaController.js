import Categoria from '../../Models/Categoria'


class CategoriaController{


 async  index(req,res){


  try {

    const categoria =  await Categoria.findAll();

    if(!categoria){

      return res.json({success:false, message: 'CATEGORIAS NÃO ENCONTRADAS'})
    }

   return res.json(categoria)

  } catch (error) {

    const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO LISTAR CATEGORIA']
    return res.status(404).json({success: false, messages: mensagemDeErro})
  }

  }

  async create(req,res){

    // Vamos tentar criar uma categoria

    try {

      if(!req.body){

        res.json("NENHUM DADO ENVIADO")
      }

      const categoria = await Categoria.create(req.body)

      return res.json(categoria)

    } catch (error) {

      const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO CRIAR CATEGORIA']
      return res.status(404).json({success: false, messages: mensagemDeErro})

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

  } catch(error){

    const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO DELETAR CATEGORIA']
    return res.status(404).json({success: false, messages: mensagemDeErro})


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

      const {Nome} = req.body

      if(!Nome){

        return res.status(400).json('PARAMETRO NOME NÃO ENVIADO')
      }

      await Categoria.update(

        {Nome},

        {where: {ID: req.params.id}}
      )

      res.status(200).json({success:true, message: 'CATEGORIA FOI ACTUALIZADA COM SUCESSO'})

    } catch (error) {

      const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO ACTUALZAR CATEGORIA']
      return res.status(404).json({success: false, messages: mensagemDeErro})

    }

  }

}

export default new CategoriaController();
