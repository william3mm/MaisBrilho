// O vendedor vai poder fazer o CRUD dos produtos
import Produto from '../../Models/Produto'

class VendedorController{

 async index(req, res){

   // Vamos poder ver todos os produtos criados

   try {

    const produto = await Produto.findAll();

    return res.json(produto);

   } catch (error) {

    console.log(error)

   }


  }


  async create(req,res){

    try {

      const {Nome, Preco, Quantidade, Categoria_ID, Descricao} = req.body

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

      return res.status(400).json({success: false, message: 'PRODUTO JA2 REGISTRADO'})
    }
    else{

      produto = await Produto.create({Nome, Preco, Quantidade,Categoria_ID, Descricao});

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

    }




  }

}


export default new VendedorController();
