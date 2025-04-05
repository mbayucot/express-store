import { Router } from 'express';
import authRoutes from './authRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

// Mount /auth/signup, /auth/login, /auth/logout
router.use('/auth', authRoutes);

export default router;
