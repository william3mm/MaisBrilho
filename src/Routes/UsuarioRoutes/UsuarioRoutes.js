import { Router } from "express";

import usuarioController from "../../Controllers/UsuarioController/UsuarioController";

import LoginRequired from "../../Middlewares/LoginRequired";

const router = new Router();

router.post('/:id/', LoginRequired, usuarioController.criar_carrinho);

router.post('/', LoginRequired, usuarioController.adicionar_item_ao_carrinho)

router.get('/', LoginRequired, usuarioController.listar_carrinho);

export default router
