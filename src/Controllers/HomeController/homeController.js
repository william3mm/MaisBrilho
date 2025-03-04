import Produto from '../../Models/Produto'

const {Sequelize} = require('sequelize');

class HomeController{


  // Na Home vamos poder visualizar e pesquisar por produtos

  async index(req,res){

    try {


      const produto = await Produto.findAll()

      return res.json(produto);

    } catch (error) {

      console.log(error);

      return res.status(404).json('ERRO AO LISTAR PRODUTOS');

    }

  }

  // Vamos adicionar a pesquisa

  async search(req,res){

    // Vamos tentar implementar a busca a partir do nome

    const {Nome} = req.body;

    const produto = await Produto.findAll({

      where: Sequelize.literal(  "MATCH(Nome) AGAINST(:nome IN BOOLEAN MODE)"),

      replacements: {nome: Nome}
    });

    if(produto.length === 0){

      return res.status(404).json('PRODUTO NÃO ENCONTRADO')
    }

    return res.json(produto);

  }

  // Vamos implementar
}


export default new HomeController();
