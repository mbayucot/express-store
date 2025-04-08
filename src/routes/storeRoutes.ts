import { Router } from 'express';
import { StoreRepository } from '../repositories/storeRepository';
import { createStoreController } from '../controllers/storeController';

const router = Router();
const storeRepo = new StoreRepository();
const storeController = createStoreController(storeRepo);

router.get('/', storeController.index);
// @ts-ignore
router.get('/:id', storeController.show);
router.post('/', storeController.create);
router.put('/:id', storeController.update);
router.delete('/:id', storeController.delete);

export default router;
