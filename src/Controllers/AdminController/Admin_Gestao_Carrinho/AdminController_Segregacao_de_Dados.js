//COMO TEMOS QUE ENTREGAR OS DADOS DO CARRINHOS MAS DEVEMOS SEGREGAR/SEPARAR ELES DE DADOS IRRELEVANTES VAMOS FAZER ISTO AQUI NESTA CLASSE

import Carrinho from "../../../Models/Carrinho";

import Carrinho_Produto from '../../../Models/Carrinho_Produto'
import Produto from "../../../Models/Produto";


class Segregacao_de_Dados{

  // Nesta classe vamos separar todos os dados que precisamos

 async index(req,res){

  try {

    // Vamos ter que filtrar as informacoes que devem ser apresentadas, tanto do Carrinho quanto do Produto
    const carrinhos = await Carrinho_Produto.findAll({


      include: [

        {model: Carrinho  ,

          attributes: [ 'id', 'QUANTIDADE_ADICIONADA', 'VALOR_TOTAL', 'USUARIO_ID']


        },

        {model: Produto,

          attributes: ['id', 'NOME', 'PRECO', 'QUANTIDADE', 'CATEGORIA_ID']
        }
      ]


    });

    return res.json(carrinhos);


  } catch (error) {

    console.log(error);

    res.status(400).json('ERRO AO BUSCAR DADOS')

  }



  }

}

export default new Segregacao_de_Dados();
