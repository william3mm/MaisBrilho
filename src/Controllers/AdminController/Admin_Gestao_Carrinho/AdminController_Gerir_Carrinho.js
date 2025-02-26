/* NESTA ROTA O ADMIN VAI RECEBER O CARRINHO FINAL QUE VAI INCLUIR:

SOBRE O USUÁRIO:

1- USUARIO_ID,

2 -NOME DO USUARIO

3 -NUMERO DE TELEFONE,

SOBRE O CARRINHO:

1- ID_PRODUTO

2- NOME DO PRODUTO

3- CATEGORIA DO PRODUTO

4- QUANTIDADE DO PRODUTO

5- PRECO DO PRODUTOS

6 - TOTAL A PAGAR

*/

import Segregacao_de_Dados from "./AdminController_Segregacao_de_Dados";
class AdminController_Gerir_Carrinhos{

  async index(req,res){

    // AQUI VAMOS VISUALIZAR TODOS OS CARRINHOS CRIADOS

    try {

      return Segregacao_de_Dados.index(req,res);


    } catch (error) {

      console.log(error);
      return res.status(400).json('ERRO AO PROCURAR POR CARRINHOS');

    }


  }

}


export default new AdminController_Gerir_Carrinhos();
