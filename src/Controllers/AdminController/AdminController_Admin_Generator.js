// Aqui vamos poder gerar outros administradores

import Admin from  '../../Models/Admin'
class AdminController_Admin_Generator{


  async index(req,res){

    try {

      const admin =  await Admin.findAll( {attributes: [ 'ID', 'NOME', 'EMAIL', 'SENHA']});

      if(!admin){

        return res.json("NENHUM ADMINISTRADOR ENCONTRADO OU CRIADO")
      }

      res.json(admin)

    } catch (e) {

      console.log(e)

      return res.json({

        errors: [ 'ERRO AO LISTAR ADMINISTRADORES']
      })

    }

  }

  async create(req,res){

    try {
      if(!req.body){

        return res.json("NENHUM PARÂMETRO ENVIADO")
      }

      const {NOME, EMAIL, SENHA} = req.body;

      console.log(NOME, SENHA, EMAIL)

      if(!NOME || !EMAIL || !SENHA){

        return res.json(" NOME SENHA OU EMAIL VAZIOS")
      }
      const admin = await Admin.create({NOME, EMAIL, SENHA})

      res.json(admin)

    } catch (e) {

      console.log(e)

      const validateErrors = e.errors.map(err => err.message)


      return res.json({

        errors: [validateErrors]
      })

    }


  }

  async delete(req,res){

    try {

      if(!req.params.id){

        return res.json("ID NÃO ENVIADO")

      }

      const admin = await Admin.findByPk(req.params.id)

      if(!admin){

        return res.json("NENHUM ADMIN ENCONTRADO")

      }

      admin.destroy();

      res.json("ADMIN DELETADO COM SUCESSO")

    } catch (e) {

      console.log(e);

     return res.json("ERRO AO DELETAR USUÁRIO")

    }

  }

  async update(req,res){

    try {

      if(!req.params.id){

        return res.json("NENHUM PARAMETRO ENVIADO")
       }

      if(!req.body){

        return res.json("POR FAVOR DECLARE O PARÂMETRO A SER MUDADO")
      }
        const admin = await Admin.findByPk(req.params.id);

        if(!admin){

          return res.json("NENHUM ADMIN ENCONTRADO")
        }

        const novos_dados = await admin.update(req.body);

        return res.json(novos_dados)



    } catch (e) {

      console.log(e);

      const validateErrors = e.errors.map(err => err.message)


      return res.json({

        errors: [validateErrors]
      })

    }


  }
}

export default new AdminController_Admin_Generator();
