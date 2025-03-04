 import Categoria from "../Models/Categoria";

 export default async function  GerarCodigo(nome_produto, categoria_produto, sequencial = 1) {
    // Garantir que os parâmetros sejam strings e tratar espaços em excesso
    const nome = nome_produto.trim().toUpperCase();

    const categoria =  await Categoria.findByPk(categoria_produto)

    if(!categoria){

      throw new Error( 'CATEGORIA NÃO ENCONTRADA')
    }
    const categoria_nome = categoria.NOME.trim().toUpperCase();

    // Abreviação da categoria (primeiras 3 letras ou menos, caso seja curta)
    const abreviacaoCategoria = categoria_nome.slice(0, 3);

    // Abreviação do nome (primeiras 3 letras do nome do produto)
    const abreviacaoNome = nome.replace(/\s+/g, "").slice(0, 3);

    // Ano e mês (formato AAAA-MM)
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");

    const milisegundos = dataAtual.getMilliseconds();

    // Sequencial formatado (com 4 dígitos)
    const sequenciaFormatada = String(sequencial).padStart(6, "0");

    // Gera o código final
    const codigoFinal = `${abreviacaoCategoria}-${abreviacaoNome}-${ano}${mes}-${milisegundos}-${sequenciaFormatada}`;
    return codigoFinal;
  }
