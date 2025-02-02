import { Router } from "express";

import adminController_Categoria from "../../Controllers/AdminController/AdminController_Categoria";

const router = new Router();

router.get('/', adminController_Categoria.index);

router.post('/', adminController_Categoria.create);

router.put('/:id', adminController_Categoria.update);

router.delete('/:id', adminController_Categoria.delete);



export default router;
