// O vendedor vai poder fazer o CRUD dos produtos

import Produto from '../../Models/Produto'
import Produto_Vendedor from '../../Models/Produto_Vendedor';

import Valida_Campos from './Funcoes/Valida_Campos_Da_Actualizacao/Valida_Campos';


class VendedorController{

 async index(req, res){

   // Vamos poder ver todos os produtos criados pelo vendedor

   try {



    const produto = await Produto_Vendedor.findAll({

      where: {

        Vendedor_ID: req.userID
      },

      attributes: ['Ativo', 'Desconto'],
      include: {

        model:Produto,

        as: 'produto',

        attributes: [ 'ID', 'Nome', 'Preco', 'Quantidade', 'Descricao','Categoria_ID', 'Codigo']


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

      const {Nome, Preco, Quantidade, Descricao, Categoria_ID,  Desconto} = req.body

      if(!Nome || !Preco || !Quantidade || !Categoria_ID || !Descricao){



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

        Vendedor_ID: req.userID,

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

      return res.json({success: true , messages:'PRODUTO DELETADO COM SUCESSO'})

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

      /*Vamos limitar as actualizacoes que o usuario pode realizar ao produto, verificando se os dados enviados na requisicao

      correspondem aos dados que o vendedor está permitido a actualizar
      */

      // Estes sao os valores que nao podem ser alterados pelo vendedor, caso ele tente alterar vamos lancao um erro
      const {Codigo, createdAt, updatedAt, Produto_ID, Vendedor_ID} = req.body

      // Vamos pegar os valores que o vendedor pode actualizar e ter certeza que eles sejam validos

      const {Nome,Preco,Quantidade,Descricao} = req.body

      /*

        Antes de actualizarmos o produto devemos nos certificar que, tanto a quantidade quanto o preco:


        1- Sejam do tipo Number

        2- Sejam diferentes de zero

        3 Sejam maiores do que 1

        Para os campos Nome e Descricao, devemos nos certificar que:

        1- Sejam do tipo String

      */


      if(!Valida_Campos(Nome,Preco,Quantidade,Descricao)){

        return res.status(400).json({success: false, message: 'ERRO NOS VALORES PASSADOS'})
      }



      if(Codigo || createdAt || updatedAt || Produto_ID || Vendedor_ID){


        return res.status(403).json({success:false, message: 'VOCÊ APENAS PODE ACTUALIZAR OS SEGUINTES DADOS DO PRODUTO: ["Nome", "Preco", "Quantidade", "Categoria_ID"]'})
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
