import Admin from '../../../Models/Admin';

class Criar_Conta {
  // eslint-disable-next-line
  async create(req, res) {
    try {
      const {
        Nome, Email, Senha, Telefone,
      } = req.body;

      if (!Nome || !Email || !Senha || !Telefone) {
        return res.json({ sucess: false, message: 'POR FAVOR CERTIFIQUE-SE DE ENVIAR OS SEGUINTES DADOS: Email, SENHA E TELEFONE' });
      }

      // eslint-disable-next-line no-unused-vars
      const admin = await Admin.create({

        Nome,
        Email,

        Senha,

        Telefone,
      });

      return res.status(200).json({ sucess: true, message: 'CONTA CRIADA COM SUCESSO' });
    } catch (error) {
      console.log(error);

      // O ?. verifica se o erro existe antes de tentar acessar a chave

      const mensagensDeErro = error.errors?.map((err) => err.message) || [ 'Erro de validação' ];
      return res.status(400).json({ errors: mensagensDeErro });
    }
  }
}

export default new Criar_Conta();
