import Vendedor from '../../../../Models/Vendedor';

import { Op } from 'sequelize';

//import status from '../../../../config/status'

export default async function Admite_Rejeita_Vendedores(req,res){


  try {

    // Vamos filtrar os vendedores com a situacao 'pendente' e actualizar o estado para aprovado ou rejeitado


    const vendedores_Pendentes = await Vendedor.findAll({

      where: {

        Status: { [Op.or]: ['pendente', 'rejeitado']}
      },

      attributes: ['ID', 'NOME', 'EMAIL', 'TELEFONE', 'Status'],

      raw: true
    })

    if(!vendedores_Pendentes.length){

      return res.status(404).json({success: false, message: 'NENHUM VENDEDOR PENDENTE OU REJEITADO'})
    }

    // Vamos capturar os dados da requisicao

    const {Status, Vendedor_ID} = req.body

    // Vamos verificar se os dados estao a ser passados

    if(!Status || !Vendedor_ID){

      return res.status(400).json('STATUS OU VENDEDOR_ID NÃO ENVIADOS')
    }

    const vendedor = vendedores_Pendentes.find( vendedor => vendedor.ID ===  Number(Vendedor_ID))

    if(!vendedor){

      return res.status(404).json('VENDEDOR NÃO ENCONTRADO')
    }

    await Vendedor.update(

      {Status},

      {where: {ID: Vendedor_ID}}
    )

    return res.json({ success: true, message: `STATUS ACTUALIZADO PARA ${Status} COM SUCESSO`})


  } catch (error) {

    console.log(error)

    const mensagemDeErro = error.errors?.map(err => err.message) || [ 'ERRO AO ADMITIR OU REJEITAR VENDEDOR']

    return res.status(400).json({success: false, messages: mensagemDeErro})
  }

}
