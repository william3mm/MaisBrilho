
import Usuario from "../Models/Usuario";
class HomeController{

  index(req,res){

    res.json('oi chato macaco...')


  }

  async create(req,res){

    const {NOME, EMAIL, SENHA} = req.body;

    const usuario = await Usuario.create({

      NOME,
      EMAIL,
      SENHA
    })

    res.json(usuario)
  }
}

export default new HomeController();
