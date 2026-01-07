import express from 'express';
import { getProfile, upsertProfile } from '../controllers/ProfileController';
import { protect } from '../middleware/Auth';

const router = express.Router();

router.route('/')
  .get(getProfile)
  .post(protect, upsertProfile);

export default router;