import Produto from "../Models/Produto";

import Categoria from '../Models/Categoria'

export default async function GerarCodigo(nome_produto, categoria_produto) {
  try {
    const nome = nome_produto.trim().toUpperCase();
    const categoria = await Categoria.findByPk(categoria_produto);

    if (!categoria) {
      throw new Error('CATEGORIA NÃO ENCONTRADA');
    }

    const categoria_nome = categoria.Nome.trim().toUpperCase();
    const abreviacaoCategoria = categoria_nome.slice(0, 3);
    const abreviacaoNome = nome.replace(/\s+/g, "").slice(0, 3);

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");

    // Pega o último produto para determinar o próximo sequencial
    const ultimoProduto = await Produto.findOne({
      order: [['createdAt', 'DESC']],
    });

    const sequencial = ultimoProduto ? ultimoProduto.id + 1 : 1;

    const codigoFinal = `${abreviacaoCategoria}-${abreviacaoNome}-${ano}${mes}-${sequencial.toString().padStart(6, "0")}`;

    return codigoFinal;

  } catch (error) {
    console.log(error);
    return 'ERRO AO GERAR CÓDIGO DO PRODUTO';
  }
}
