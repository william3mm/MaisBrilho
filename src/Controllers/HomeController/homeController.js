
import Lista_Produtos from './Funcoes/Lista_Produtos/Lista_Produtos';

import Pesquisa_Produtos from './Funcoes/Pesquisa_Produtos/Pesquisa_Produtos';



class HomeController{


  // Na Home vamos poder visualizar e pesquisar por produtos

  async index(req,res){


   return  Lista_Produtos(req,res)
  }

  // Vamos adicionar a pesquisa

  async search(req,res){

    return Pesquisa_Produtos(req,res)


  }

  // Vamos implementar
}


export default new HomeController();
