import { Router } from 'express';
import { ProductRepository } from '../repositories/productRepository';
import { createProductController } from '../controllers/productController';

const router = Router();
const productRepo = new ProductRepository();
const productController = createProductController(productRepo);

router.get('/', productController.index);
// @ts-ignore
router.get('/:id', productController.show);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;
