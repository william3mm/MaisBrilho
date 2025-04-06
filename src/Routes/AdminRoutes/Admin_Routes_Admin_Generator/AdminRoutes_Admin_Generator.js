import { Router } from 'express';

import adminController from '../../../Controllers/AdminController/AdminController_Admin_Generator';

const router = new Router();

router.get('/', adminController.index);

router.post('/', adminController.create);

router.delete('/:id', adminController.delete);

router.put('/:id', adminController.update);

export default router;
