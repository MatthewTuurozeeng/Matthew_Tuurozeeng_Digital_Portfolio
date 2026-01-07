import express from 'express';
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from '../controllers/ContactController';
import { protect } from '../middleware/Auth';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  submitContact
);

router.get('/', protect, getContacts);

router.route('/:id')
  .put(protect, updateContactStatus)
  .delete(protect, deleteContact);

export default router;