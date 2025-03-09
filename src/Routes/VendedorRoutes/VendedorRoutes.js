import { Router } from "express";

import VendedorController from "../../Controllers/VendedorController/VendedorController";

import Vendedor_Login_Required from '../../Middlewares/Vendedor_Login_Required'

const app =  new Router();

app.get('/', Vendedor_Login_Required, VendedorController.index)

app.post('/',Vendedor_Login_Required, VendedorController.create)

app.delete('/:id', Vendedor_Login_Required, VendedorController.delete);

app.put('/:id', Vendedor_Login_Required, VendedorController.update)




export default app;
