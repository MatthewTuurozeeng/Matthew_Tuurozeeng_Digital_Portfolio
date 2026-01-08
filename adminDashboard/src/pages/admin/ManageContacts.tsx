import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Button, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/admin/Sidebar';
import { adminContactApi } from '../../services/adminApi';

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
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);

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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await adminContactApi.updateStatus(id, status);
      toast.success('Status updated successfully!');
      fetchContacts();
      setShowModal(false);
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
        setShowModal(false);
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
                <tr key={contact._id} style={{ fontWeight: contact.status === 'new' ? 'bold' : 'normal' }}>
                  <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
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

          {/* View Contact Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Contact Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedContact && (
                <>
                  <div className="mb-3">
                    <strong>From:</strong> {selectedContact.name} ({selectedContact.email})
                  </div>
                  <div className="mb-3">
                    <strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleString()}
                  </div>
                  <div className="mb-3">
                    <strong>Subject:</strong> {selectedContact.subject}
                  </div>
                  <div className="mb-3">
                    <strong>Message:</strong>
                    <p className="mt-2 p-3 bg-light rounded">{selectedContact.message}</p>
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
                onClick={() => handleStatusChange(