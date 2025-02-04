import { Router } from "express";

import adminController from '../../Controllers/AdminController/AdminController_Produto';



const router = new Router();


router.post('/',adminController.create);

router.put('/:id',adminController.update);

router.delete('/:id',  adminController.delete)

router.get('/',adminController.index)

export default router
