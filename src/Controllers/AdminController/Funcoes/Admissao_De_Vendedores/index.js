import Admite_Rejeita_Vendedores from "./Admitir_Rejeitar_Vendedores"
class Admissao_Rejeicao{


  async index(req,res){

    return Admite_Rejeita_Vendedores(req,res)
  }


}


export default new Admissao_Rejeicao()
