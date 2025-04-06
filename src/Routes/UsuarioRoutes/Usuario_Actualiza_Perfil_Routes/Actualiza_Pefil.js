import { Router } from 'express';

import loginRequired from '../../../Middlewares/LoginRequired';

import actualiza_Perfil from '../../../Controllers/Usuario_Actualiza_Perfil/Actualiza_Perfil';

const app = new Router();

app.post('/', loginRequired, actualiza_Perfil.update);

export default app;
