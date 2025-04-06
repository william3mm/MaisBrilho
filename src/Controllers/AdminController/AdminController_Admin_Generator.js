// Aqui vamos poder gerar outros administradores

import Admin from '../../Models/Admin';

class AdminController_Admin_Generator {
  async index(req, res) {
    try {
      const admin = await Admin.findAll({ attributes: [ 'ID', 'NOME', 'EMAIL', 'SENHA' ] });

      if (!admin) {
        return res.json('NENHUM ADMINISTRADOR ENCONTRADO OU CRIADO');
      }

      return res.json(admin);
    } catch (e) {
      console.log(e);

      return res.json({

        errors: [ 'ERRO AO LISTAR ADMINISTRADORES' ],
      });
    }
  }

  async create(req, res) {
    try {
      if (!req.body) {
        return res.json('NENHUM PARÂMETRO ENVIADO');
      }

      const { NOME, EMAIL, SENHA } = req.body;

      console.log(NOME, SENHA, EMAIL);

      if (!NOME || !EMAIL || !SENHA) {
        return res.json(' NOME SENHA OU EMAIL VAZIOS');
      }
      const admin = await Admin.create({ NOME, EMAIL, SENHA });

      res.json(admin);
    } catch (error) {
      console.log(error);

      const mensagemDeErro = error.errors?.map((err) => err.message) || [ 'ERRO AO FAZER LOGIN' ];

      return res.status(404).json({ success: false, messages: mensagemDeErro });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.json('ID NÃO ENVIADO');
      }

      const admin = await Admin.findByPk(req.params.id);

      if (!admin) {
        return res.json('NENHUM ADMIN ENCONTRADO');
      }

      admin.destroy();

      res.json('ADMIN DELETADO COM SUCESSO');
    } catch (error) {
      const mensagemDeErro = error.errors?.map((err) => err.message) || [ 'ERRO AO FAZER LOGIN' ];
      return res.status(404).json({ success: false, messages: mensagemDeErro });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.json('NENHUM PARAMETRO ENVIADO');
      }

      if (!req.body) {
        return res.json('POR FAVOR DECLARE O PARÂMETRO A SER MUDADO');
      }
      const admin = await Admin.findByPk(req.params.id);

      if (!admin) {
        return res.json('NENHUM ADMIN ENCONTRADO');
      }

      const novos_dados = await admin.update(req.body);

      return res.json(novos_dados);
    } catch (error) {
      const mensagemDeErro = error.errors?.map((err) => err.message) || [ 'ERRO AO FAZER LOGIN' ];
      return res.status(404).json({ success: false, messages: mensagemDeErro });
    }
  }
}

export default new AdminController_Admin_Generator();
