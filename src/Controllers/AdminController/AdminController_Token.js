import dotenv from 'dotenv';

import TokenGenerator from './Funcoes/TokenGenerator/Token_Generator_Admin';

dotenv.config();

class TokenController {
// eslint-disable-next-line
  async create(req, res) {
    try {
      return TokenGenerator(req, res);
    } catch (error) {
      console.log(error);

      const mensagemDeErro = error.errors?.map((err) => err.message) || [ 'ERRO AO FAZER LOGIN' ];
      return res.status(404).json({ success: false, messages: mensagemDeErro });
    }
  }
}
export default new TokenController();
