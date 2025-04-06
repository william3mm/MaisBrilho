import Usuario from '../../Models/Usuario';

class AdminController_Usuarios {
  // Aqui vamos poder listar, e deletar usuários

  async index(req, res) {
    try {
      const usuario = await Usuario.findAll({
        attributes: [ 'id', 'NOME', 'EMAIL', 'SENHA' ],

        order: [ [ 'ID', 'DESC' ] ],

      });

      res.json(usuario);

      // Podemos ter acesso aos dados passados na requisicao pelo middeware em login required

      // console.log( 'User Id', req.userId);

      // console.log('User Email', req.userEmail)
    } catch (error) {
      console.log(error);

      return res.status(400).json({

        errors: [ 'Erro ao listar Usuários' ],
      });
    }
  }
}

export default new AdminController_Usuarios();
