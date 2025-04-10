// Este middleware vai verificar se o vendedor possui o Status 'aprovado'

import Vendedor from '../Models/Vendedor';

export default async (req, res, next) => {
  // Primeiro vamos ver se o vendedor possui o Status aprovado

  try {
    const vendedor = await Vendedor.findByPk(req.userID);

    if (!vendedor) {
      return res.status(404).json({ success: false, message: 'VENDEDOR NÃO ENCONTRADO' });
    }

    if (vendedor.Status != 'aprovado') {
      return res.status(403).json('NÃO APROVADO POR FAVOR ESPERE A VERIFICAÇÃO');
    }

    next();
  } catch (error) {
    const mensagemDeErro = error.errors?.map((err) => err.message) || [ 'ERRO AO VALIDAR O STATUS DE APROVADO DO VENDEDOR' ];

    return res.status(404).json({ success: false, messages: mensagemDeErro });
  }
};
