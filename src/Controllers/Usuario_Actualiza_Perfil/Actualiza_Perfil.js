import Usuario from '../../Models/Usuario'


class Actualiza_Pefil{


  async update(req,res){

    // Aqui vamos fazer a pesquisa pelo id fornecido quando o usuario for autenticado


    const {Nome, Email, Telefone} =  req.body


    try {

      const usuario = await Usuario.findByPk(req.userID)

      if(!usuario){

        return res.json({sucess:false, message: 'USUÁRIO NÃO ENCONTRADO'})
      }

      await usuario.update( {Nome, Email, Telefone})

      return res.status(200).json({sucess:true, message:'Perfil Actualizado com Sucesso'})

    } catch (error) {

      const mensagemDeErro =  error.errors?.map(err => err.message) || ['Erro de Validação']
      console.log(error.message)
      return res.status(400).json({sucess:false, messages: mensagemDeErro})

    }

  }

}


export default new Actualiza_Pefil()
