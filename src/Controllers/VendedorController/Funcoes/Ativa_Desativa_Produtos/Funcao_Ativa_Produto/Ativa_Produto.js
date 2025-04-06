import Produto_Vendedor from '../../../../../Models/Produto_Vendedor';

export default async function Gerencia_Status(req, res) {
  try {
    const produtos = await Produto_Vendedor.findAll({

      where: {

        Vendedor_ID: req.userID,
      },

      attributes: [ 'Produto_ID', 'Ativo', 'Desconto', 'Vendedor_ID' ],

      raw: true,

    });

    // Vamos tentar pegar o ID do produto

    const { Produto_ID, Status } = req.body;

    if (!Produto_ID || typeof Status !== 'boolean') {
      return res.status(400).json({ success: false, message: 'PRODUTO_ID E STATUS SÃO OBRIGATÓRIO' });
    }

    // Vamos verificar se o produto pertence ao vendedor logado

    const produtoParaAtualizar = produtos.find((produto) => produto.Produto_ID === Number(Produto_ID));

    if (!produtoParaAtualizar) {
      return res.status(404).json({ success: false, message: 'PRODUTO NÃO ENCONTRADO OU NÃO PERTENCE AO VENDEDOR' });
    }

    // Vamos actualizar o campo com base ao status enviado

    await Produto_Vendedor.update(

      { Ativo: Status },

      { where: { Produto_ID, Vendedor_ID: req.userID } },
    );

    // Se o Status for true message:ativado se Status for false message:desativado
    return res.status(200).json({ success: true, message: `Produto: foi ${Status ? 'ativado' : 'desativado'}` });
  } catch (error) {
    console.log(error);

    const mensagemDeErro = error.errors?.map((err) => err.message) || [ 'ERRO AO ATIVAR PRODUTO' ];

    return res.status(400).json({ success: false, messages: mensagemDeErro });
  }
}
