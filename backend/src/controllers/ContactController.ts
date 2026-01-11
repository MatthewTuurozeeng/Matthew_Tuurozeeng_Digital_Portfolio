import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { sendEmail } from '../utils/EmailService';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
      return;
    }

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notification to you
    try {
      await sendEmail({
        to: process.env.EMAIL_USER!,
        subject: `📧 New Contact Form Message: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .header {
                background-color: #994545;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 5px 5px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #994545;
                margin-bottom: 5px;
              }
              .value {
                padding: 10px;
                background-color: #f5f5f5;
                border-left: 3px solid #994545;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #666;
                font-size: 12px;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #994545;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎯 New Contact Form Submission</h2>
              </div>
              <div class="content">
                <p>You have received a new message from your portfolio website!</p>
                
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                <div class="field">
                  <div class="label">📝 Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="button">
                    Reply to ${name}
                  </a>
                </div>
              </div>
              <div class="footer">
                <p>This message was sent from your portfolio contact form</p>
                <p>Submitted on: ${new Date().toLocaleString()}</p>
                <p>Contact ID: ${contact._id}</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      console.log('✅ Email notification sent to admin');
    } catch (emailError) {
      console.error('❌ Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    // Send auto-reply to the person who contacted you
    try {
      await sendEmail({
        to: email,
        subject: `Thank you for contacting me - ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .header {
                background-color: #994545;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 5px 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Reaching Out!</h2>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                
                <p>Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
                
                <p><strong>Your message:</strong></p>
                <p style="padding: 15px; background-color: #f5f5f5; border-left: 3px solid #994545;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
                
                <p>I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly at <a href="mailto:tuurozeeng.matthew@ashesi.edu.gh">tuurozeeng.matthew@ashesi.edu.gh</a>.</p>
                
                <p>Best regards,<br>
                <strong>Matthew Tuurozeeng</strong><br>
                Computer Science Student | Software Engineer<br>
                Ashesi University</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      console.log('✅ Auto-reply sent to user');
    } catch (autoReplyError) {
      console.error('❌ Failed to send auto-reply:', autoReplyError);
      // Don't fail the request if auto-reply fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
    });
  } catch (error: any) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error.message,
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get contact by ID
// @route   GET /api/contact/:id
// @access  Private
export const getContactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    // Auto-mark as read when viewed
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private
export const updateContactStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.body;

    // Validate status
    if (!['new', 'read', 'replied'].includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get unread contacts count
// @route   GET /api/contact/unread/count
// @access  Private
export const getUnreadCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const count = await Contact.countDocuments({ status: 'new' });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Reply to contact
// @route   POST /api/contact/:id/reply
// @access  Private
export const replyToContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ message: 'Please provide a reply message' });
      return;
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    // Send reply email
    await sendEmail({
      to: contact.email,
      subject: `Re: ${contact.subject || 'Your message'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #994545;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .original-message {
              margin-top: 20px;
              padding: 15px;
              background-color: #f5f5f5;
              border-left: 3px solid #994545;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Reply from Matthew Tuurozeeng</h2>
            </div>
            <div class="content">
              <p>Hi ${contact.name},</p>
              
              <p>${message.replace(/\n/g, '<br>')}</p>
              
              <div class="original-message">
                <p><strong>Your original message:</strong></p>
                <p>${contact.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p style="margin-top: 20px;">Best regards,<br>
              <strong>Matthew Tuurozeeng</strong><br>
              Computer Science Student | Software Engineer<br>
              Ashesi University<br>
              <a href="mailto:tuurozeeng.matthew@ashesi.edu.gh">tuurozeeng.matthew@ashesi.edu.gh</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Update contact status to replied
    contact.status = 'replied';
    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
    });
  } catch (error: any) {
    console.error('Reply failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: error.message,
    });
  }
};