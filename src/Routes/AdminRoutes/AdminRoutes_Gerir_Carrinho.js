import { Router } from "express";

import AdminController_Gerir_Carrinhos from '../../Controllers/AdminController/Admin_Gestao_Carrinho/AdminController_Gerir_Carrinho'

const router = new Router();

router.get('/', AdminController_Gerir_Carrinhos.index);

export default router;

