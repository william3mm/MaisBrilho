import Gerencia_Status  from "./Funcao_Ativa_Produto/Ativa_Produto";

class Ativa_Desativa_Produtos{


  async Ativa_Produtos(req,res){

    return Gerencia_Status(req,res);
  }


}


export default new Ativa_Desativa_Produtos();
