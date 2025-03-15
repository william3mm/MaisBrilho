import Admite_Rejeita_Vendedores from "./Admitir_Rejeitar_Vendedores"

import Suspender_Analisar_Vendedores from './Suspender_Analisar_Vendedores'

import Lista_Vendedores from "./Lista_Vendedores"
class Admissao_Rejeicao{


  async admite_rejeita(req,res){

    return Admite_Rejeita_Vendedores(req,res)
  }

  async suspender(req,res){

    return Suspender_Analisar_Vendedores(req,res)

  }

  async index(req,res){

    return Lista_Vendedores(req,res)
  }


}


export default new Admissao_Rejeicao()
