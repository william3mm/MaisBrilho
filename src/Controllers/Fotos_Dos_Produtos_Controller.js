
class Fotos_Dos_ProdutosController{


  index(req,res){

    res.json("FOTOS DO SEU PRODUTO AQUI OK???")
  }


  async create(req,res){

    return res.json(req.files)




  }
}


export default new Fotos_Dos_ProdutosController();
