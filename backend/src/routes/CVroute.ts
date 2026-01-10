import express from 'express';
import {
  getCVs,
  getCVByType,
  getAllCVs,
  getCVById,
  createCV,
  updateCV,
  deleteCV,
  toggleCVActive,
} from '../controllers/CVcontroller';
import { authenticateToken } from '../middleware/Auth';

const router = express.Router();

// Public routes
router.get('/', getCVs);
router.get('/:type', getCVByType);

// Admin routes
router.get('/admin/all', authenticateToken, getAllCVs);
router.get('/admin/:id', authenticateToken, getCVById);
router.post('/', authenticateToken, createCV);
router.put('/:id', authenticateToken, updateCV);
router.delete('/:id', authenticateToken, deleteCV);
router.patch('/:id/toggle', authenticateToken, toggleCVActive);

export default router;