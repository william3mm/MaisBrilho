 import Produto from "../../Models/Produto";
 import CalculaTotal from "./CalculaTotal";
 import Carrinho from "../../Models/Carrinho";
import Carrinho_Produto from "../../Models/Carrinho_Produto";


 class CarrinhoController{

  // Vamos listar o que está no carrinho

  async index(req,res){


    try {

      const carrinho = await Carrinho.findOne(

        {

          where: {

            Usuario_ID:  req.userID
          },


        }
      );

      if(!carrinho){

        return res.status(404).json({success: false, message: 'CARRINHO NÃO ENCONTRADO'})
      }

      return res.json(carrinho);

    } catch (error) {


       const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO LISTAR PRODUTOS NO CARRINHO']
        return res.status(400).json({success: false, messages: mensagemDeErro})
    }


  }

  async create(req,res){

      // Vamos criar o metodo de adicionar ao carrinho para o usuario

      try {

        const {id} = req.params

        if(!id){

          return res.status(400).json({success: false, message: 'NENHUM PARÂMETRO ENVIADO'})
        }

        const produto = await Produto.findOne({

          where: {

            id,


          },

          attributes: [ 'id', 'Nome', 'Preco'],

        });

        if(!produto){

          return res.status(404).json('PRODUTO NAO ENCONTRADO')
        }


        // Vamos pegar a quantidade

        const {Quantidade_Adicionada} = req.body

         // Primeiro vamos pegar o preco do produto

         const produto_preco = parseFloat( produto.Preco);


           // Vamos calcular o total atraves da funcao CalculaTotal

        const Valor_Total_Item= CalculaTotal(Quantidade_Adicionada, produto_preco);


         // Vamos buscar ou criar o carrinho do usuário

         let carrinho =  await Carrinho.findOne({

          where: {Usuario_ID: req.userID}
        })

        if(!carrinho){

          // Vamos tentar criar o carrinho aqui
         carrinho =  await Carrinho.create({Usuario_ID: req.userID, Valor_Total: 0})
       }

        // Vamos verificar se o produto já está no carrinho

        const ItemExistente =  await Carrinho_Produto.findOne({

          where:{

            Carrinho_ID: carrinho.id,

            Produto_ID : produto.id
          }

        })



        if(ItemExistente){

          // Caso o item exista, vamos actualizar a quantidade e o valor total do item no carrinho

          ItemExistente.Quantidade_Adicionada += Quantidade_Adicionada;

          // Vamos actualizar também o valor total depois da quantidade ser adicionada

          ItemExistente.Valor_Total_Item = ItemExistente.Quantidade_Adicionada * produto_preco

          await ItemExistente.save();

        } else{

          /* Caso o item nao existir vamos adicionar um novo produto ao carrinho

            Agora vamos criar o registro na tabela intermediaria Carrinho_Produto
          */

          await Carrinho_Produto.create({

            Carrinho_ID: carrinho.id,

           Produto_ID: produto.id,

            Quantidade_Adicionada,

            Valor_Total_Item
          })

        }

        // Vamos actualizar o valor total do carrinho com base aos produtos nele
        const total_Carrinho = await Carrinho_Produto.sum("Valor_Total_Item" , { where: {Carrinho_ID: carrinho.id }})

        carrinho.Valor_Total = total_Carrinho || 0;

        await carrinho.save()
        return res.json(carrinho);



      } catch (error) {

        console.log(error)
        const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO ADICIONAR PRODUTO AO CARRINHO']
        return res.status(400).json({success: false, messages: mensagemDeErro})



      }


  }


  async update(req,res){

    // Vamos remover itens do carrinho

    try {

      // Primeiro vamos pegar o ID do produto a ser removido

      const {id} = req.params;

      const {Quantidade_Removida} = req.body

      if(!id){

        return res.status(400).json("NENHUM PARÂMETRO ENVIADO")
      }

      if(!Quantidade_Removida){

        return res.status(400).json("POR FAVOR INDIQUE A QUANTIDADE A SER REMOVIDA")

      }

      // Vamos buscar o carrinho

      let carrinho = await Carrinho.findOne({ where: {Usuario_ID: req.userID}});


      if(!carrinho){

        return res.status(404).json("CARRINHO NÃO ENCONTRADO")
      }


      // Vamos buscar o item do carrinho

      let item = await Carrinho_Produto.findOne({

        where: {

          Carrinho_ID: carrinho.id,

          Produto_ID: id
        }
      });

      if(!item){

        return res.status(404).json("PRODUTO NÃO ENCONTRADO NO CARRINHO")
      }

      // Vamos calcular o total a ser removido

      const produto = await Produto.findOne(

        {
          where:{id},

          attributes: ['Preco']
        }
      )

      const Valor_Total_Removido = produto.Preco * Quantidade_Removida;

      // Vamos reduzir a quantidade ou remover o item completamente

    if(item.Quantidade_Adicionada > Quantidade_Removida){

      item.Quantidade_Adicionada -= Quantidade_Removida;

      item.Valor_Total_Item -= Valor_Total_Removido;

      await item.save()

    }else{

      item.destroy();
    }

    // Agora vamos actualizar o valor total do carrinho

    carrinho.Valor_Total -= Valor_Total_Removido;

    if(carrinho.Valor_Total < 0) carrinho.Valor_Total = 0; //Vamos evitar números negativos

    await carrinho.save()

      res.json({success:true, carrinho});
    } catch (error) {

      const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO REDUZIR QUANTIDADE DO PRODUTO']

      return res.status(400).json({success: false, messages: mensagemDeErro})
    }

  }
 }

 export default new CarrinhoController();
