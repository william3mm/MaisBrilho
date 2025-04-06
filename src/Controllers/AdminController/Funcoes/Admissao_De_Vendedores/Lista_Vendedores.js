// Vamos poder listar os vendedores de acordo com um filtro

import Vendedor from '../../../../Models/Vendedor';

import { Status_Vendedor } from '../../../../config/status';

export default async function Lista_Vendedores(req, res) {
  try {
    const { Status } = req.body;

    if (!Status) {
      return res.status(400).json('STATUS  NÃO ENVIADO');
    }

    // Vamos garantir que o status enviado é valido

    const Status_Formatado = Status.trim().toLowerCase();

    if (!Status_Vendedor.includes(Status_Formatado)) {
      return res.status(400).json({ success: false, message: 'STATUS INVÁLIDO experimente os seguintes Status: ["aprovado", "rejeitado", "pendente", "suspenso", "em análise"]' });
    }

    const vendedores = await Vendedor.findAll({

      where: {

        Status,
      },

      attributes: [ 'ID', 'Nome', 'Email', 'Telefone', 'Status' ],

    });

    if (!vendedores.length) {
      return res.status(404).json({ success: false, message: 'VENDEDORES NÃO ENCONTRADOS' });
    }

    return res.status(200).json({ success: true, vendedores });
  } catch (error) {
    console.log(error);

    const mensagemDeErro = error.errors?.map((err) => err.message) || [ 'ERRO AO LISTAR VENDEDORES' ];

    return res.status(400).json({ success: false, messages: mensagemDeErro });
  }
}
