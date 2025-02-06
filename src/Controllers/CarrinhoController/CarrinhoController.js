 import Produto from "../../Models/Produto";
 import CalculaTotal from "./CalculaTotal";
 import Carrinho from "../../Models/Carrinho";
import Carrinho_Produto from "../../Models/Carrinho_Produto";


 class CarrinhoController{


  // Vamos listar o que está no carrinho

  async index(req,res){

    const carrinho = await  Carrinho.findAll();

    return res.json(carrinho);
  }



  async create(req,res){

      // Vamos criar o metodo de adicionar ao carrinho para o usuario

      try {

        const {id} = req.params

        if(!id){

          return res.status(400).json('Nenhum parametro enviado')
        }

        const produto = await Produto.findOne({

          where: {

            id

          },

          attributes: [ 'PRECO', 'NOME', 'id'],


        });


        if(!produto){

          return res.status(404).json('PRODUTO NAO ENCONTRADO')
        }


        // Primeiro vamos pegar o preco do produto

        const produto_preco = produto.PRECO;

        // Vamos pegar a quantidade

        const {QUANTIDADE_ADICIONADA, USUARIO_ID} = req.body


        if(!USUARIO_ID){

          return res.json('O ID DO USUÁRIO É OBRIGATÓRIO');
        }

        console.log(USUARIO_ID)
        // Vamos calcular o total atraves da funcao CalculaTotal

        const VALOR_TOTAL = CalculaTotal(QUANTIDADE_ADICIONADA, produto_preco);

        // Vamos tentar criar o carrinho aqui

        const carrinho =  await Carrinho.create({QUANTIDADE_ADICIONADA, VALOR_TOTAL,USUARIO_ID:req.body.USUARIO_ID,})


        // Agora vamos criar o registro na tabela intermediaria Carrinho_Produto

        await Carrinho_Produto.create({

          CARRINHO_ID: carrinho.id,

          PRODUTO_ID: produto.id
        })

        return res.json(carrinho);



      } catch (error) {
        console.log(error)
        return res.status(400).json('ERRO AO ADICIONAR PRODUTO AO CARRINHO')



      }


  }


 }

 export default new CarrinhoController();
