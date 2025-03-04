import Vendedor from  '../../Models/Vendedor'

class Criar_Conta{

  async create  (req,res){

   try {

    const {Nome, Email, Telefone, Senha} =  req.body;

    if(!Nome || !Email || !Senha || !Telefone){

      return res.json('POR FAVOR CERTIFIQUE-SE DE ENVIAR OS SEGUINTES DADOS: NOME, SENHA E TELEFONE')
    }
    const vendedor = await Vendedor.create({

      Nome,

      Senha,

      Email,

      Telefone
    })

    return res.status(200).json(vendedor);


   } catch (error) {

    console.log(error);

    return res.status(400).json('ERRO AO CRIAR CONTA')

   }
  }
}

export default  new Criar_Conta();
