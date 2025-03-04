import { Router } from "express";

import VendedorController from "../../Controllers/VendedorController/VendedorController";

const app =  new Router();

app.get('/', VendedorController.index)

app.post('/', VendedorController.create)

app.delete('/:id', VendedorController.delete);

app.put('/:id', VendedorController.update)


export default app;
