import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middleware/Auth';

import { 
  getAllImpacts,
  getImpactById,
  createImpact,
  updateImpact,
  deleteImpact 
} from '../controllers/ImpactController';

router.get('/', getAllImpacts);
router.post('/', authenticateToken, createImpact);
router.get('/:id', getImpactById);
router.put('/:id', authenticateToken, updateImpact);
router.delete('/:id', authenticateToken, deleteImpact);

export default router;