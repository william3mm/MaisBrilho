import { Router } from "express";

import usuarioController from "../Controllers/UsuarioController";

import LoginRequired from "../Middlewares/LoginRequired";

const router = new Router();

router.get('/',  LoginRequired, usuarioController.index) // Falha de segurança lista todos os usuarios

router.post('/', usuarioController.create)

router.delete('/', LoginRequired, usuarioController.delete)

router.put('/',  LoginRequired, usuarioController.update)

export default router
