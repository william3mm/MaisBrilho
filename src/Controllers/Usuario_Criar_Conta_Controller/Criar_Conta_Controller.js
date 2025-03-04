import Usuario from '../../Models/Usuario'

class Criar_Conta{

  async create  (req,res){

   try {

    const {Nome, Senha, Telefone} =  req.body;

    if(!Nome || !Senha || !Telefone){

      return res.json('POR FAVOR CERTIFIQUE-SE DE ENVIAR OS SEGUINTES DADOS: NOME, SENHA E TELEFONE')
    }
    const usuario = await Usuario.create({

      Nome,

      Senha,

      Telefone
    })

    return res.status(200).json(usuario);


   } catch (error) {

    console.log(error);

    // O ?. verifica se o erro existe antes de tentar acessar a chave

    const mensagensDeErro = error.errors?.map(err => err.message) || ['Erro de validação'];
return res.status(400).json({ success: false, messages: mensagensDeErro });

}
  }
}

export default  new Criar_Conta();
