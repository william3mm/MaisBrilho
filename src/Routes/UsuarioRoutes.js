import { Router } from "express";

import usuarioController from "../Controllers/UsuarioController";

const router = new Router();


router.get('/', usuarioController.index )

router.post('/', usuarioController.create)


export default router
