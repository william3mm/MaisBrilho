 import Produto from "../../Models/Produto";
 import CalculaTotal from "./CalculaTotal";
 import Carrinho from "../../Models/Carrinho";
import Carrinho_Produto from "../../Models/Carrinho_Produto";


 class CarrinhoController{


  // Vamos listar o que está no carrinho

  async index(req,res){

    const carrinho = await Carrinho.findOne(

      {

        where: {

          USUARIO_ID :  req.userID
        },

        include: [

          {model: Produto,

            attributes: [ 'id', 'NOME']
          }
        ]
      }
    );

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

        // Vamos buscar ou criar o carrinho do usuário

        let carrinho =  await Carrinho.findOne({

          where: {USUARIO_ID: req.userID}
        })


        // Vamos pegar a quantidade

        const {QUANTIDADE_ADICIONADA} = req.body
        // Caso não ouver nenhum carrinho associado ao usuário vamos criar um

        if(!req.userID){

          return res.json('O ID DO USUÁRIO É OBRIGATÓRIO');
        }
        if(!carrinho){

           // Vamos tentar criar o carrinho aqui
          carrinho =  await Carrinho.create({QUANTIDADE_ADICIONADA, VALOR_TOTAL: VALOR_TOTAL_ITEM, USUARIO_ID: req.userID,})
        }

        // Primeiro vamos pegar o preco do produto

        const produto_preco = produto.PRECO;

        // Vamos calcular o total atraves da funcao CalculaTotal

        const VALOR_TOTAL_ITEM = CalculaTotal(QUANTIDADE_ADICIONADA, produto_preco);

        // Vamos verificar se o produto já está no carrinho

        const ItemExistente =  await Carrinho_Produto.findOne({

          where:{

            CARRINHO_ID: carrinho.id,

            PRODUTO_ID : produto.id
          }
        })

        if(ItemExistente){

          // Caso o item exista, vamos actualizar a quantidade e o valor total do item no carrinho

          ItemExistente.QUANTIDADE_ADICIONADA += QUANTIDADE_ADICIONADA;

          await ItemExistente.save();

        } else{

          /* Caso o item nao existir vamos adicionar um novo produto ao carrinho

            Agora vamos criar o registro na tabela intermediaria Carrinho_Produto
          */

          await Carrinho_Produto.create({

            CARRINHO_ID: carrinho.id,

            PRODUTO_ID: produto.id
          })

        }

        // Vamos actualizar também o valor total do carrinho

        carrinho.VALOR_TOTAL += VALOR_TOTAL_ITEM;

        await carrinho.save();

        return res.json(carrinho);



      } catch (error) {
        const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO ADICIONAR PRODUTO AO CARRINHO']
        return res.status(400).json({success: false, messages: mensagemDeErro})



      }


  }


  async update(req,res){

    // Aqui, depois de criar o carrinho, vai ser possível adicionar mais itens dentro dele

    // Primeiro vamos localizar o carrinho associado ao id do usuario


    try {

      if(!req.userID){

        res.status(400).json("ID DO USUÁRIO NÃO ENVIADO");
      }

      const carrinho = await Carrinho.findOne({

        where: {

          USUARIO_ID: req.userID
        }


      })

      res.json(carrinho);
    } catch (error) {

      const mensagemDeErro = error.errors?.map(err => err.message) || [ 'Erro AO FAZER LOGIN']

      return res.status(400).json({success: false, messages: mensagemDeErro})
    }


  }




 }

 export default new CarrinhoController();
