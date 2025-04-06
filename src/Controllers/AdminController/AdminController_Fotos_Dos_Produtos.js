import Fotos_Dos_Produtos_Controller from '../Fotos_Dos_Produtos_Controller/Fotos_Dos_Produtos_Controller';

class AdminController_Fotos_Dos_Produtos {
  index(req, res) {
    return Fotos_Dos_Produtos_Controller.index(req, res);
  }

  create(req, res) {
    return Fotos_Dos_Produtos_Controller.create(req, res);
  }
}

export default new AdminController_Fotos_Dos_Produtos();
