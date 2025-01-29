import { Router } from "express";

import adminController from '../../Controllers/AdminController/AdminController_Produto';

const router = new Router();


router.post('/', adminController.create_produto);

router.put('/:id', adminController.update_produto);

router.delete('/:id', adminController.delete)

router.get('/', adminController.index)

export default router
