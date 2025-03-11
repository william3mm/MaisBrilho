import CategoriaController from  '../CategoriaController/CategoriaController';


class AdminController_Categoria{


  index(req,res){

    return CategoriaController.index(req,res)
  }

  async create(req,res){

    try {


      return CategoriaController.create(req,res);

    } catch (error) {

      const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO FAZER LOGIN']
      return res.status(404).json({success: false, messages: mensagemDeErro})

    }

}

async update(req,res){

  try {

   return CategoriaController.update(req,res);


  } catch (error) {


    const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO FAZER LOGIN']
    return res.status(404).json({success: false, messages: mensagemDeErro})

  }
}

async delete(req,res){

  return CategoriaController.delete(req,res);
}


}

export default new AdminController_Categoria();
