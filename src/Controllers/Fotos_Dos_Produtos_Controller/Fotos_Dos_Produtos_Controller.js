
import Fotos_Dos_Produtos from '../../Models/Fotos_Dos_Produtos';

class Fotos_Dos_ProdutosController{


  index(req,res){

    return res.json("FOTOS DO SEU PRODUTO AQUI OK???")
  }


   async create(req,res){

    try{


    if(!req.files || req.files.length === 0){

      return res.json({errors: "NENHUM FICHEIRO ENVIADO"})
    }

    // Vamos obter um objecto com originalname e filename
    const file = req.files.map((file) => ({

      originalname:file.originalname,

      filename: file.filename
    }))

    // Aqui iteramos sobre os objectos temos como retorno o nome original e o nome do ficheiro
    const Originalname = file.map((file) => file.originalname);

    const Filename = file.map((file)=> file.filename);

    console.log(file)

    if(!req.body){

      return res.json("NENHUM PARAMETRO ENVIADOS")
    }
   // Aqui o produto ID é passado como string precisamos converter ele


    const {Produto_ID} = req.body

    const Foto = await Fotos_Dos_Produtos.create({ Originalname, Filename, Produto_ID})

    return res.json(Foto)
  }catch(error){

    const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO SALVAR FOTO']
    return res.status(404).json({success: false, messages: mensagemDeErro})
  }


  }
}


export default new Fotos_Dos_ProdutosController();
