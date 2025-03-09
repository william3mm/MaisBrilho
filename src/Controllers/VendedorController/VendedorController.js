// O vendedor vai poder fazer o CRUD dos produtos

import Produto from '../../Models/Produto'
import Produto_Vendedor from '../../Models/Produto_Vendedor';

class VendedorController{

 async index(req, res){

   // Vamos poder ver todos os produtos criados pelo vendedor

   try {


    const produto = await Produto_Vendedor.findAll({

      where: {

        Vendedor_ID: req.userID
      },

      include: {

        model:Produto,

        attributes: [ 'Nome', 'Preco', 'Quantidade', 'Descricao','Categoria_ID']


      }

    })

    return res.json(produto);

   } catch (error) {

    console.log(error)


    const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO LISTAR PRODUTOS']
    return res.json({success:false, messages: mensagemDeErro})
   }


  }


  async create(req,res){

    try {

      const {Nome, Preco, Quantidade, Descricao, Categoria_ID, Vendedor_ID, Desconto} = req.body

      if(!Nome || !Preco || !Quantidade || !Categoria_ID || !Descricao || !Vendedor_ID || !Desconto){



        return res.json({success:false, messages: 'DADOS NÃO ENVIADOS OU INCOMPLETOS'})
      }


    // Vamos checar se o produto já existe

    let produto =  await Produto.findOne({

      where: {

        Nome,

        Descricao
      }
    })

    if(produto){

      return res.status(400).json({success: false, message: 'PRODUTO JÁ REGISTRADO'})
    }
    else{

      produto = await Produto.create({Nome, Preco,Descricao, Categoria_ID, Quantidade,});

      // Vamos criar a associacao do produto ao vendedor
      await Produto_Vendedor.create({

        Produto_ID: produto.id,

        Vendedor_ID,



        Desconto: Desconto || 0.00
      })

      return res.json({success:true, produto});

    }


    } catch (error) {

      console.log(error);

      const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO CRIAR PRODUTO']

      return res.status(400).json({success: false, messages: mensagemDeErro})
    }



  }

  async delete(req,res){


    try {

      if(!req.params.id){

        return res.json('Nenhum ID enviado');
      }

      const produto = await Produto.findByPk(req.params.id);

      if(!produto){

        return res.status(404).json({success: false, messages: 'PRODUTO NÃO ENCONTRADO'})
      }

      // Caso o produto seja encontrado vamos deletar ele

     await produto.destroy();

      return res.json({success: true , messages:'PRODUTO DELETADO COM successO'})

    } catch (error) {

      console.log(error);

      const mensagemDeErro =  error.errors?.map(err => err.message) || [ 'ERRO AO DELETAR PRODUTO']

      return res.json({success: false, messages: mensagemDeErro})

    }

  }

  async update(req,res){

    // Vamos poder actualizar o produto:

    // Primeiro vamos checar se o produto a ser actualizado existe

    try {

      if(!req.params.id){

        return res.status(400).json('NENHUM ID ENVIADO')
      }

      const produto = await Produto.findByPk(req.params.id);

      if(!produto){

        return res.status(400).json('PRODUTO NÃO ENCONTRADO');
      }

      const novo_produto = await produto.update(req.body);

      return res.json(novo_produto);

    } catch (error) {

      console.log(error);

      const mensagemDeErro =  error.errors?.map(err => err.message) || [ 'ERRO AO DELETAR PRODUTO']

      return res.json({success: false, messages: mensagemDeErro})

    }

  }


  async ativar_desativar_produto(req,res){

    // Esta funcao vai nos permitir manipular o estado de um produto, dizendo se ele está ativo ou nao

    try {

      const produto = await Produto_Vendedor.findByPk(req.userID)

      return res.status(200).json(produto);



    } catch (error) {

      console.log(error);

      const mensagemDeErro =  error.errors?.map(err => err.message) || [ 'ERRO AO DELETAR PRODUTO']

      return res.status(400).json({success: false, messages: mensagemDeErro})


    }
  }

}


export default new VendedorController();
