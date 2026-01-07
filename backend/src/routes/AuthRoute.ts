import express from 'express';
import { login, getMe } from '../controllers/AuthController';
import { protect } from '../middleware/Auth';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);

export default router;