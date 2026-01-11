import express from 'express';
import {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getUnreadCount,
  replyToContact,
} from '../controllers/ContactController';
import { authenticateToken } from '../middleware/Auth';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters'),
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Public route
router.post('/', validateContact, submitContact);

// Admin routes
router.get('/', authenticateToken, getContacts);
router.get('/unread/count', authenticateToken, getUnreadCount);
router.get('/:id', authenticateToken, getContactById);
router.put('/:id', authenticateToken, updateContactStatus);
router.delete('/:id', authenticateToken, deleteContact);
router.post('/:id/reply', authenticateToken, replyToContact);

export default router;