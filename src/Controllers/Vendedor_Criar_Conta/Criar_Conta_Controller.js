import Vendedor from  '../../Models/Vendedor'

class Criar_Conta{

  async create  (req,res){

   try {

    const {Nome, Email, Telefone, Senha} =  req.body;

    if(!Nome || !Email || !Senha || !Telefone){

      return res.json('POR FAVOR CERTIFIQUE-SE DE ENVIAR OS SEGUINTES DADOS: NOME, SENHA E TELEFONE')
    }
    // eslint-disable-next-line no-unused-vars
    const vendedor = await Vendedor.create({

      Nome,

      Senha,

      Email,

      Telefone
    })

    return res.status(200).json( {success: true, message: 'CONTA DE VENDEDOR CRIADA COM SUCESSO'});


   } catch (error) {

    const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO CRIAR CONTA DO VENDEDOR']
    return res.status(400).json({success: false, messages: mensagemDeErro})


   }
  }
}

export default  new Criar_Conta();
