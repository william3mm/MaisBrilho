import { Router } from 'express';

import criar_conta_vendedor from '../../../Controllers/AdminController/Admin_Criar_Conta/Admin_Criar_Conta_Controller';

const router = new Router();

router.post('/', criar_conta_vendedor.create);

export default router;
