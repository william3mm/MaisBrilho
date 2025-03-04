import { Router } from "express";

import homeController from "../../Controllers/HomeController/homeController";
const app = new Router();

app.get('/', homeController.index);

app.post('/busca/', homeController.search)

export default app;
