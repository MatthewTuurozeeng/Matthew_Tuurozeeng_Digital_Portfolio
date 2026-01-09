import express from 'express';
import { login, getMe } from '../controllers/AuthController';
import { authenticateToken } from '../middleware/Auth';

const router = express.Router();

router.post('/login', login);
router.get('/me', authenticateToken, getMe);

export default router;