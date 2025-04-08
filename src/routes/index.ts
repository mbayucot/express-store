import { Router } from 'express';
import authRoutes from './authRoutes';
import storeRoutes from './storeRoutes';
import productRoutes from './productRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

// Mount /auth/signup, /auth/login, /auth/logout
router.use('/auth', authRoutes);
router.use('/stores', storeRoutes);
router.use('/products', productRoutes);

export default router;
