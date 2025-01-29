import { Router } from "express";

import categoriaController from "../Controllers/CategoriaController";

const router = new Router();

router.get('/', categoriaController.index )
router.post('/', categoriaController.create)
router.delete('/:id', categoriaController.delete)
router.put('/:id', categoriaController.update)

export default router
