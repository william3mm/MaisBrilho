import { Router } from "express";

import usuarioController from "../Controllers/UsuarioController";

const router = new Router();


router.get('/', usuarioController.index )


export default router
