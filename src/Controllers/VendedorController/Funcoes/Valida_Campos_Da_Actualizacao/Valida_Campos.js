 export default function Valida_Campos(Nome,Preco,Quantidade,Descricao){

  let campos_validos  = true

  const verificacao_Nome =  (typeof Nome !== 'undefined') && ((typeof Nome !== 'string'));

  const verificacao_Preco = (typeof Preco !== 'undefined') &&  ((typeof Preco !== 'number') || (Preco < 0 || Preco === 0));

  const verificacao_Quantidade =  (typeof Quantidade !== 'undefined') && ((typeof Quantidade !== 'number') || (Quantidade < 0 || Quantidade === 0));

  const verificacao_Descricao = (typeof Descricao !== 'undefined') && ( (typeof Descricao !== 'string'));

  if(verificacao_Quantidade || verificacao_Preco || verificacao_Nome || verificacao_Descricao){

    campos_validos =  false;

    return campos_validos
  }

  return campos_validos

}

