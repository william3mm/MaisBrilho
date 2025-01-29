import { Router } from "express";

import foto_dos_produtosController from '../Controllers/Fotos_Dos_Produtos_Controller'

const router = new Router();

router.get('/', foto_dos_produtosController.index)

export default router
