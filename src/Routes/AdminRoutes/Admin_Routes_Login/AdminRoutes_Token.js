import { Router } from 'express';

import TokenController from '../../../Controllers/AdminController/AdminController_Token';

const router = Router();

router.post('/', TokenController.create);

export default router;
