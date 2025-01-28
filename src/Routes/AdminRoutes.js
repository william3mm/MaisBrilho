import { Router } from "express";

import adminController from "../Controllers/AdminController";

const router = new Router();


router.get('/', adminController.index )



export default router
