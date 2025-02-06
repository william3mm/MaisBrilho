import { Router } from "express";

import usuarioController from "../Controllers/UsuarioController/UsuarioController";

import LoginRequired from "../Middlewares/LoginRequired";

const router = new Router();

router.get('/', usuarioController.index) // Falha de segurança lista todos os usuarios

router.post('/', usuarioController.create)

router.delete('/', LoginRequired, usuarioController.delete)

router.put('/',  LoginRequired, usuarioController.update)

router.post('/:id/', usuarioController.adiciona_ao_carrinho)

export default router
