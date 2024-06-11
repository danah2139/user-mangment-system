import { Router } from 'express';
import { userController } from '../controllers';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, userController.getAllUsers);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

export default router;