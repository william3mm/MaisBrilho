import { Op } from 'sequelize';
import Vendedor from '../../../../Models/Vendedor';

import { Status_Vendedor_Aprovacao_Rejeicao } from '../../../../config/status';

export default async function Admite_Rejeita_Vendedores(req, res) {
  try {
    // Vamos filtrar os vendedores com a situacao 'pendente' e actualizar o estado para aprovado ou rejeitado

    const vendedores_Pendentes = await Vendedor.findAll({

      where: {

        Status: { [Op.or]: [ 'pendente', 'rejeitado', 'suspenso' ] },
      },

      attributes: [ 'ID', 'Nome', 'Email', 'Telefone', 'Status' ],

      raw: true,
    });

    if (!vendedores_Pendentes.length) {
      return res.status(404).json({ success: false, message: 'NENHUM VENDEDOR PENDENTE OU REJEITADO' });
    }

    // Vamos capturar os dados da requisicao

    const { Status, Vendedor_ID } = req.body;

    // Vamos verificar se os dados estao a ser passados

    if (!Status || !Vendedor_ID) {
      return res.status(400).json('STATUS OU VENDEDOR_ID NÃO ENVIADOS');
    }

    /* Vamos verificar se o status passado faz parte dos status permitidos, 'aprovado', 'rejeitado','pendente', 'suspenso', 'em análise'

    e para isso vamos usar o includes

    */

    if (!Status_Vendedor_Aprovacao_Rejeicao.includes(Status)) {
      return res.status(400).json({ success: false, message: 'STATUS INVÁLIDO' });
    }

    // Vai nos retornaro o vendedor equivalente ao ID do vendedor passado na requisicao
    const vendedor = vendedores_Pendentes.find((vendedor) => vendedor.ID === Number(Vendedor_ID));

    if (!vendedor) {
      return res.status(404).json('VENDEDOR NÃO ENCONTRADO');
    }

    await Vendedor.update(

      { Status },

      { where: { ID: Vendedor_ID } },
    );

    return res.json({ success: true, message: `STATUS ACTUALIZADO PARA ${Status} COM SUCESSO` });
  } catch (error) {
    console.log(error);

    const mensagemDeErro = error.errors?.map((err) => err.message) || [ 'ERRO AO ADMITIR OU REJEITAR VENDEDOR' ];

    return res.status(400).json({ success: false, messages: mensagemDeErro });
  }
}
