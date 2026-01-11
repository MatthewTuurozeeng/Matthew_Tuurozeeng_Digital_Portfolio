import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/admin/Sidebar';
import { adminContactApi } from '../../services/AdminApi';

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

const ManageContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await adminContactApi.getAll();
      setContacts(response.data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    }
  };

  const handleViewContact = async (contact: Contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);

    // Mark as read if it's new
    if (contact.status === 'new') {
      try {
        await adminContactApi.updateStatus(contact._id, 'read');
        fetchContacts();
      } catch (error) {
        console.error('Failed to update status');
      }
    }
  };

  const handleOpenReplyModal = (contact: Contact) => {
    setSelectedContact(contact);
    setShowViewModal(false);
    setShowReplyModal(true);
    
    // Pre-fill with a template
    setReplyMessage(`Hi ${contact.name},

Thank you for reaching out. 

[Your response here]

Best regards,
Matthew Tuurozeeng
Computer Science Student | Software Engineer
Ashesi University
tuurozeeng.matthew@ashesi.edu.gh`);
  };

  const handleSendReply = async () => {
    if (!selectedContact || !replyMessage.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    setSendingReply(true);
    try {
      // send reply to backend endpoint (replace URL if your API route differs)
      const res = await fetch(`/api/admin/contacts/${selectedContact._id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: replyMessage }),
      });

      if (!res.ok) {
        throw new Error('Failed to send reply');
      }

      // mark contact as replied in the admin API
      await adminContactApi.updateStatus(selectedContact._id, 'replied');

      toast.success('Reply sent successfully!');
      setShowReplyModal(false);
      setReplyMessage('');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await adminContactApi.updateStatus(id, status);
      toast.success('Status updated successfully!');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        await adminContactApi.delete(id);
        toast.success('Contact deleted successfully!');
        fetchContacts();
        if (showViewModal) setShowViewModal(false);
      } catch (error) {
        toast.error('Failed to delete contact');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge bg="primary">New</Badge>;
      case 'read':
        return <Badge bg="info">Read</Badge>;
      case 'replied':
        return <Badge bg="success">Replied</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '2rem' }}>
        <Container fluid>
          <h2 className="mb-4">Contact Messages</h2>

          {contacts.length === 0 ? (
            <div className="alert alert-info">
              No contact messages yet. Messages submitted through the contact form will appear here.
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    style={{ fontWeight: contact.status === 'new' ? 'bold' : 'normal' }}
                  >
                    <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                    <td>{contact.name}</td>
                    <td>
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </td>
                    <td>{contact.subject}</td>
                    <td>{getStatusBadge(contact.status)}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="primary"
                        className="me-2"
                        onClick={() => handleViewContact(contact)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="success"
                        className="me-2"
                        onClick={() => handleOpenReplyModal(contact)}
                      >
                        Reply
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(contact._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* View Contact Modal */}
          <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Contact Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedContact && (
                <>
                  <div className="mb-3">
                    <strong>From:</strong> {selectedContact.name} (
                    <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>)
                  </div>
                  <div className="mb-3">
                    <strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleString()}
                  </div>
                  <div className="mb-3">
                    <strong>Subject:</strong> {selectedContact.subject}
                  </div>
                  <div className="mb-3">
                    <strong>Message:</strong>
                    <p className="mt-2 p-3 bg-light rounded" style={{ whiteSpace: 'pre-wrap' }}>
                      {selectedContact.message}
                    </p>
                  </div>
                  <div className="mb-3">
                    <strong>Status:</strong> {getStatusBadge(selectedContact.status)}
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => handleStatusChange(selectedContact!._id, 'read')}
                disabled={selectedContact?.status === 'read'}
              >
                Mark as Read
              </Button>
              <Button
                variant="success"
                onClick={() => handleOpenReplyModal(selectedContact!)}
              >
                📧 Reply
              </Button>
              
              <a
                href={`mailto:${selectedContact?.email}?subject=Re: ${selectedContact?.subject}&body=Hi ${selectedContact?.name},%0D%0A%0D%0A`}
                className="btn btn-outline-primary me-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reply via Email Client
              </a>
              <Button variant="danger" onClick={() => handleDelete(selectedContact!._id)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Reply Modal */}
          <Modal
            show={showReplyModal}
            onHide={() => setShowReplyModal(false)}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Reply to {selectedContact?.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedContact && (
                <>
                  <div className="mb-3 p-3 bg-light rounded">
                    <strong>Original Message:</strong>
                    <p className="mt-2 mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                      {selectedContact.message}
                    </p>
                  </div>

                  <Form.Group>
                    <Form.Label>
                      <strong>Your Reply:</strong>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply here..."
                    />
                    <Form.Text className="text-muted">
                      This will be sent to {selectedContact.email}
                    </Form.Text>
                  </Form.Group>

                  <div className="mt-3 p-2 bg-info bg-opacity-10 rounded">
                    <small>
                      <strong>💡 Tip:</strong> Your reply will be sent via email and the contact
                      status will be automatically marked as "Replied"
                    </small>
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSendReply}
                disabled={sendingReply || !replyMessage.trim()}
              >
                {sendingReply ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    📧 Send Reply
                  </>
                )}
              </Button>
            </Modal.Footer>
          </Modal>

          <ToastContainer position="top-right" autoClose={3000} />
        </Container>
      </div>
    </div>
  );
};

export default ManageContacts;