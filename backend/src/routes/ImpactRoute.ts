import express from 'express';
import {
  getImpacts,
  getImpact,
  createImpact,
  updateImpact,
  deleteImpact,
} from '../controllers/ImpactController';
import { protect } from '../middleware/Auth';

const router = express.Router();

router.route('/')
  .get(getImpacts)
  .post(protect, createImpact);

router.route('/:id')
  .get(getImpact)
  .put(protect, updateImpact)
  .delete(protect, deleteImpact);

export default router;