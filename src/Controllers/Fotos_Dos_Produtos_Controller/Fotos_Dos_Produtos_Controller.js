import Criar_Fotos_Dos_Produtos from './Funcoes/Criar_Fotos_Dos_Produtos';

class Fotos_Dos_ProdutosController {
  index(req, res) {
    return res.json('FOTOS DO SEU PRODUTO AQUI OK???');
  }

  async create(req, res) {
    return Criar_Fotos_Dos_Produtos(req, res);
  }
}

export default new Fotos_Dos_ProdutosController();
