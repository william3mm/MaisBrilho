import { Op } from 'sequelize';
import Produto from '../Models/Produto'

class ProdutoController{

 async index(req,res){

  const produto = await Produto.findAll();

  res.json(produto)

  }

    async create(req,res){


    try {

      if (!req.body){

        res.json("NENHUM DADO ENVIADO")
      }

      const produto = await Produto.create(req.body);

      res.json(produto)

    } catch (e) {

      console.log(e.message)

      return res.status(401).json({

        errors: ['ERRO AO CRIAR PRODUTO']
      })

    }
  }

  async update(req,res){

    try{

    if(!req.params.id){

      res.json("NENHUM DADO ENVIADO")

    }

    const produto = await Produto.findByPk(req.params.id);

    if(!produto){

      res.json("NENHUM PRODUTO ENCONTRADO")
    }

    const {NOME, DESCRICAO, PRECO, CODIGO, QUANTIDADE} = req.body
    const novos_dados =  await produto.update({NOME, DESCRICAO, PRECO, CODIGO, QUANTIDADE});

    res.json(novos_dados)

  }catch(e){

    console.log(e)

return res.status(401).json({

        errors: ['ERRO AO ACTUALIZAR PRODUTO']
      })

    }
  }

  async show(req,res){

    try {




      if(!req.body && !req.params){

        return res.json("NENHUM PARÂMETRO DE BUSCA ENVIADO")
      }

      const { id} = req.params;

      const { NOME, CATEGORIA} = req.body
      /*Podemos procurar o produto pelo seu ID, NOME, CATEGORIA Para isso vamos criar uma condicao

      E vamos usar a biblioteca Op do sequelize para realizar uma busca exata
      */
      const whereCondition = {};

      if(id){

        whereCondition.id = id

      }

      if(NOME){

        whereCondition.NOME = NOME
      }

      if(CATEGORIA){

        // Busca pela categoria, ela é passada como um número, por isso não há necessidade de usarmos o Op.eq
        whereCondition.CATEGORIA = CATEGORIA;
      }




      const produto = await Produto.findOne( {

        where: { whereCondition}
      })

      if(!produto){

        return res.json("NENHUM PRODUTO ENCONTRADO")
      }

      res.json(produto)

    } catch (e) {


      console.log(e)

      return res.status(401).json({

              errors: ['ERRO AO ENCONTRAR PRODUTO']
            })

    }
  }



  async delete(req,res){


    try {

      if(!req.params.id){

        res.json("NENHUM DADO ENVIADO")

      }

      const produto  = await Produto.findByPk(req.params.id)

      if(!produto){

        res.json("NENHUM PRODUTO ENCONTRADO");
      }

      produto.destroy();

      res.json("PRODUTO DELETADO COM SUCESSO")

    } catch (e) {

      console.log(e.message)
      return res.status(401).json({

        errors: ['ERRO AO DELETAR PRODUTO']
      })
    }



  }





}

export default new ProdutoController();

