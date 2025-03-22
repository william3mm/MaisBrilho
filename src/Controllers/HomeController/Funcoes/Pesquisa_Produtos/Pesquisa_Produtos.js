import { Sequelize } from "sequelize";
import Produto from "../../../../Models/Produto";
import Produto_Vendedor from "../../../../Models/Produto_Vendedor";

export default async function Pesquisa_Produtos(req,res){

  try {

     // Vamos tentar implementar a busca a partir do nome

        const {Nome} = req.body;

        const produto = await Produto.findAll({

          where: Sequelize.literal(  "MATCH(Nome) AGAINST(:nome IN BOOLEAN MODE)"),

          replacements: {nome: Nome},

          include:{

            model: Produto_Vendedor,

            where: {Ativo:true},

            attributes: ['Ativo']
          },

          attributes: ['ID', 'NOME', 'PRECO', 'QUANTIDADE']
        });

        if(produto.length === 0){

          return res.status(404).json('PRODUTO NÃO ENCONTRADO')
        }

        return res.json(produto);
  } catch (error) {

    const mensagemDeErro =  error.errors?.map(err => err.message) || ['ERRO AO PESQUISAR POR PRODUTOS']
    console.log(error.message)
    return res.status(400).json({sucess:false, messages: mensagemDeErro})
  }
}