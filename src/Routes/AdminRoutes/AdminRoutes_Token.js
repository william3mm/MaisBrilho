import { Router } from "express";

import Admin_Controller_Token from '../../Controllers/AdminController/AdminController_Token'
const router =  Router();

router.post('/', Admin_Controller_Token.create);

export default router;

