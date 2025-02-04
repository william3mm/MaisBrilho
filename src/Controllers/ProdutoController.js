import Produto from '../Models/Produto'

import Fotos_Dos_Produtos from '../Models/Fotos_Dos_Produtos';

class ProdutoController{

 async index(req,res){

  const produto = await Produto.findAll({attributes:[ 'ID', 'NOME', 'CODIGO', 'CATEGORIA_ID', 'PRECO', 'DESCRICAO'],


  // Podemos ordenar os campos de forma que o ultimo produto criado seja o primeiro a ser exibido:


  order: [ ['ID', 'DESC']], // Significa que o ID será mostrado de forma decrescente

  // Vamos mostrar as fotos associadas ao aluno utilizando a propriedade include

  include:{

    model: Fotos_Dos_Produtos,

    // Vamos pegar apenas o ID, Originalname e o Filename

    attributes: [ 'ID','filename', 'url'] //
  }

});

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

      if(!req.params){

        return res.json("NENHUM PARÂMETRO DE BUSCA ENVIADO")
      }

      const { id} = req.params;

      const produto = await Produto.findOne( {

        where: {

          NOME: id
        }
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

