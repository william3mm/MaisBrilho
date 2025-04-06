import { Router } from 'express';

import vendedor_Criar_Conta from '../../../Controllers/Vendedor_Criar_Conta/Criar_Conta_Controller';

const app = new Router();

app.post('/', vendedor_Criar_Conta.create);

export default app;
