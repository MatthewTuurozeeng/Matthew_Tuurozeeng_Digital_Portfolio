import express from 'express';
import {
  getAllImpacts,
  getImpactById,
  createImpact,
  updateImpact,
  deleteImpact,
} from '../controllers/ImpactController';
import { authenticateToken, isAdmin } from '../middleware/Auth';

const router = express.Router();

// Public routes
router.get('/', getAllImpacts);
router.get('/:id', getImpactById);

// Protected admin routes
router.post('/', authenticateToken, isAdmin, createImpact);
router.put('/:id', authenticateToken, isAdmin, updateImpact);
router.delete('/:id', authenticateToken, isAdmin, deleteImpact);

export default router;