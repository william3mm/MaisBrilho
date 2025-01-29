import { Router } from "express";

import produtoController from "../Controllers/ProdutoController";

const router = new Router();

router.get('/', produtoController.index)

router.post('/', produtoController.create)

router.delete('/:id', produtoController.delete)

router.put('/:id', produtoController.update)

export default router
