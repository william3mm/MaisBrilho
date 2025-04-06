import { Router } from 'express';

import loginController from '../../../Controllers/Usuario_Login_Controller/LoginController';

const app = new Router();

app.post('/', loginController.login);

export default app;
