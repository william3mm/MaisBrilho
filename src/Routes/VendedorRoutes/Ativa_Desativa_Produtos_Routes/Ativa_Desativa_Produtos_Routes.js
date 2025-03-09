import { Router } from "express";

import Ativa_Desativa_Produtos from "../../../Controllers/VendedorController/Funcoes/Ativa_Desativa_Produtos";

import LoginRequired from '../../../Middlewares/LoginRequired'

const app =  new Router();


app.post('/:id', LoginRequired, Ativa_Desativa_Produtos.Ativa_Produtos)


export default app;
