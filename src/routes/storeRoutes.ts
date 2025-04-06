import { Router } from 'express';
import { StoreController } from '../controllers/storeController';

const router = Router();
const storeController = new StoreController();

router.get('/', storeController.index);
//router.get('/:id', storeController.show);
router.post('/', storeController.create);
router.put('/:id', storeController.update);
router.delete('/:id', storeController.delete);

export default router;
