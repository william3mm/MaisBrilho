import Fotos_Dos_Produtos from "../../../Models/Fotos_Dos_Produtos";

import Produto_Vendedor from "../../../Models/Produto_Vendedor"
export default async function Criar_Fotos_Dos_Produtos(req,res){


  try{


      if(req.files.length === 0){

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


      if(!req.body){

        return res.json("NENHUM PARAMETRO ENVIADOS")
      }
     // Aqui o produto ID é passado como string precisamos converter ele


      const {Produto_ID} = req.body

      // Devemos nos certificar se o produto  pertence realmente ao vendedor

      const produto = await Produto_Vendedor.findOne(

        {
          where: {

            Vendedor_ID: req.userID,

            Produto_ID: Produto_ID
          }
        }
      )

      if(!produto){

        return res.status(400).json({success: false, message: 'PRODUTO NÃO EXISTE OU NÃO PERTENCE AO VENDEDOR'})

      }else{

        const Foto = await Fotos_Dos_Produtos.create({ Originalname, Filename, Produto_ID})

        return res.json({Foto})

      }


    }catch(error){

      const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO SALVAR FOTO']
      return res.status(404).json({success: false, messages: mensagemDeErro})
    }
}