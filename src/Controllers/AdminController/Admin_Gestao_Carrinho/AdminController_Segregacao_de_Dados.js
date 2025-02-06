//COMO TEMOS QUE ENTREGAR OS DADOS DO CARRINHOS MAS DEVEMOS SEGREGAR/SEPARAR ELES DE DADOS IRRELEVANTES VAMOS FAZER ISTO AQUI NESTA CLASSE

import Carrinho from "../../../Models/Carrinho";

import Carrinho_Produto from '../../../Models/Carrinho_Produto'
import Produto from "../../../Models/Produto";


class Segregacao_de_Dados{

  // Nesta classe vamos separar todos os dados que precisamos

 async index(req,res){

  try {

    const carrinhos = await Carrinho_Produto.findAll({

      include:{

        model: Carrinho,





      }


    });

    return res.json(carrinhos)


  } catch (error) {

    console.log(error);

    res.status(400).json('ERRO AO BUSCAR DADOS')

  }



  }

}

export default new Segregacao_de_Dados();
