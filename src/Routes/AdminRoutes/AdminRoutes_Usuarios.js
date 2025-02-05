import { Router } from "express";

import AdminController_Usuarios from '../../Controllers/AdminController/AdminController_Usuarios'
const router =  Router();

router.get('/', AdminController_Usuarios.index);

export default router;
