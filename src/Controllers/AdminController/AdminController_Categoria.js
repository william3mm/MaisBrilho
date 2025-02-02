import CategoriaController from  '../../Controllers/CategoriaController';


class AdminController_Categoria{


  index(req,res){

    return CategoriaController.index(req,res)
  }

  async create(req,res){

    try {


      return CategoriaController.create(req,res);

    } catch (e) {

      console.log(e)

      return res.status(400).json({

        errors: ['ERRO AO CRIAR CATEGORIA']
      })

    }

}

async update(req,res){

  try {

   return CategoriaController.update(req,res);


  } catch (e) {


    console.log(e);

    const Validator = e.erros.map(err=> err.message)


    return res.status(400).json({


      errors: [Validator]
    })

  }
}

async delete(req,res){

  return CategoriaController.delete(req,res);
}


}

export default new AdminController_Categoria();
