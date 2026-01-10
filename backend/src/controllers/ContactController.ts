import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { sendEmail } from '../utils/EmailService';

// @desc Submit contact form
// @route POST /api/contacts
// @access Public
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ message: 'Required fields missing' });
      return;
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    // Send email notification
    await sendEmail({
      to: process.env.CONTACT_EMAIL || 'owner@example.com',
      subject: `New Contact Message: ${subject || 'No subject'}`,
      html: `
        <h3>New Portfolio Contact</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(201).json({
      message: 'Message sent successfully',
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// @desc Get all contacts (admin)
// @route GET /api/contacts
// @access Private/Admin
export const getAllContacts = async (_req: Request, res: Response): Promise<void> => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json(contacts);
};

// @desc Get contact by ID
export const getContactById = async (req: Request, res: Response): Promise<void> => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }
  res.status(200).json(contact);
};

// @desc Update contact status
export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }

  res.status(200).json(contact);
};

// @desc Delete contact
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }

  res.status(200).json({ message: 'Contact deleted' });
};
