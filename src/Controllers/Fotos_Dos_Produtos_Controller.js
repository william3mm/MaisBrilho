
import Fotos_Dos_Produtos from '../Models/Fotos_Dos_Produtos';

class Fotos_Dos_ProdutosController{


  index(req,res){

    res.json("FOTOS DO SEU PRODUTO AQUI OK???")
  }


   async create(req,res){

    try{


    if(!req.files){

      return res.json({errors: "NENHUM FICHEIRO ENVIADO"})
    }

    const file = req.files.map((file) => ({

      originalname:file.originalname,

      filename: file.filename
    }))

    const originalname = file.map((file) => file.originalname);

    const filename = file.map((file)=> file.filename);

    if(!req.body){

      return res.json("NENHUM PARAMETRO ENVIADOS")
    }
   // Aqui o produto ID é passado como string precisamos converter ele


    const {PRODUTO_ID} = req.body

    const Foto = await Fotos_Dos_Produtos.create({ originalname, filename, PRODUTO_ID})

    return res.json(Foto)
  }catch(e){

    console.log(e);
    return res.status(400).json({

      errors: 'ERRO AO SALVAR FOTO'
    })
  }


  }
}


export default new Fotos_Dos_ProdutosController();
