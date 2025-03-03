import { Router } from "express";

import criar_Conta_Controller from "../../Controllers/Criar_Conta_Controller/Criar_Conta_Controller";
const app = new Router();

app.post('/', criar_Conta_Controller.create);

export default app
