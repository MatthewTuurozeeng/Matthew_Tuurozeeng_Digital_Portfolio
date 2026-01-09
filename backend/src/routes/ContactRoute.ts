import express from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from '../controllers/ContactController';
import { authenticateToken, isAdmin } from '../middleware/Auth';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Protected admin routes
router.get('/', authenticateToken, isAdmin, getAllContacts);
router.get('/:id', authenticateToken, isAdmin, getContactById);
router.patch('/:id/status', authenticateToken, isAdmin, updateContactStatus);
router.delete('/:id', authenticateToken, isAdmin, deleteContact);

export default router;