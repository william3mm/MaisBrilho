import Fotos_Dos_Produtos from "../../../../Models/Fotos_Dos_Produtos"
import Produto from "../../../../Models/Produto"
import Produto_Vendedor from "../../../../Models/Produto_Vendedor"

export default async function Lista_Produtos(req,res){


  try {

    const produtos =  await Produto.findAll(

      {

        include: [{



         model: Produto_Vendedor,

         where: {Ativo:true},

         attributes: ['Ativo']


        },

        {

          model: Fotos_Dos_Produtos,

          attributes: ['OriginalName', 'FileName'],

          as: 'fotos'
        }

      ],

        attributes: ['ID','Nome', 'Preco', 'Quantidade', 'Descricao']
      }
    )

    if(produtos.length === 0) {

      return res.status(404).json({success:false, message:'NENHUM PRODUTO ENCONTRADO'})
    }

      return res.status(200).json({success: true, produtos})
  } catch (error) {

    const mensagemDeErro =  error.errors?.map(err => err.message) || ['ERRO AO LISTAR PRODUTOS']
    console.log(error.message)
    return res.status(400).json({sucess:false, messages: mensagemDeErro})


  }
}