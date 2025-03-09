import { Router } from "express";

import admissao_rejeicao from '../../../Controllers/AdminController/Funcoes/Admissao_De_Vendedores/index'


const router = new Router();

router.post('/',admissao_rejeicao.index)

export default router
