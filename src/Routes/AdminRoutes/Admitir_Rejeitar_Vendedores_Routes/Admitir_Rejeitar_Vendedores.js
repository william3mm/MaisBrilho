import { Router } from 'express';

import admissao_rejeicao from '../../../Controllers/AdminController/Funcoes/Admissao_De_Vendedores/index';

const router = new Router();

router.post('/', admissao_rejeicao.admite_rejeita);

router.put('/', admissao_rejeicao.suspender);

router.get('/', admissao_rejeicao.index);

export default router;
