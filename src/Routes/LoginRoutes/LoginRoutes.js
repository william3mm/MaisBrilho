import { Router } from "express";

import loginController from "../../Controllers/LoginController/LoginController";

const app = new Router();

app.post('/', loginController.login)

app.get('/', loginController.index)

export default app
