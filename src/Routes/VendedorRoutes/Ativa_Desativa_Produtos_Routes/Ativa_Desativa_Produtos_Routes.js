import { Router } from 'express';

import Ativa_Desativa_Produtos from '../../../Controllers/VendedorController/Funcoes/Ativa_Desativa_Produtos/index';

import Vendedor_Login_Required from '../../../Middlewares/Vendedor_Login_Required';

import Status_Aprovado_Required from '../../../Middlewares/Status_Aprovado_Required';

const app = new Router();

app.post('/', Vendedor_Login_Required, Status_Aprovado_Required, Ativa_Desativa_Produtos.Ativa_Desativa_Produtos);

export default app;
