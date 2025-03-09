import { Router } from "express";

import VendedorController from "../../Controllers/VendedorController/VendedorController";

import LoginRequired from '../../Middlewares/LoginRequired'

const app =  new Router();

app.get('/', LoginRequired, VendedorController.index)

app.post('/',LoginRequired, VendedorController.create)

app.delete('/:id', LoginRequired, VendedorController.delete);

app.put('/:id', LoginRequired, VendedorController.update)




export default app;
