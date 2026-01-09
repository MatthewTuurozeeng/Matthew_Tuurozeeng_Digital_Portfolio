import React, { useEffect, useState } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/admin/Sidebar';
import FileUpload from '../../components/admin/FileUpload';
import { adminImpactApi } from '../../services/AdminApi';

interface Impact {
  _id: string;
  title: string;
  period: string;
  color: string;
  description: string;
  achievements: string[];
  image?: string;
  gallery?: string[];
  order: number;
}

const ManageImpact: React.FC = () => {
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingImpact, setEditingImpact] = useState<Impact | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    period: '',
    color: '#994545',
    description: '',
    achievements: '',
    image: '',
    gallery: [] as string[],
    order: 0,
  });

  useEffect(() => {
    fetchImpacts();
  }, []);

  const fetchImpacts = async () => {
    try {
      const response = await adminImpactApi.getAll();
      setImpacts(response.data);
    } catch (error) {
      toast.error('Failed to fetch impact initiatives');
    }
  };

  const handleOpenModal = (impact?: Impact) => {
    if (impact) {
      setEditingImpact(impact);
      setFormData({
        title: impact.title,
        period: impact.period,
        color: impact.color,
        description: impact.description,
        achievements: impact.achievements.join('\n'),
        image: impact.image || '',
        gallery: impact.gallery || [],
        order: impact.order,
      });
    } else {
      setEditingImpact(null);
      setFormData({
        title: '',
        period: '',
        color: '#994545',
        description: '',
        achievements: '',
        image: '',
        gallery: [],
        order: 0,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingImpact(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const impactData = {
      ...formData,
      achievements: formData.achievements
        .split('\n')
        .map((achievement) => achievement.trim())
        .filter((achievement) => achievement.length > 0),
    };

    try {
      if (editingImpact) {
        await adminImpactApi.update(editingImpact._id, impactData);
        toast.success('Impact initiative updated successfully!');
      } else {
        await adminImpactApi.create(impactData);
        toast.success('Impact initiative created successfully!');
      }
      fetchImpacts();
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to save impact initiative');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this impact initiative?')) {
      try {
        await adminImpactApi.delete(id);
        toast.success('Impact initiative deleted successfully!');
        fetchImpacts();
      } catch (error) {
        toast.error('Failed to delete impact initiative');
      }
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '2rem' }}>
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Manage Impact Initiatives</h2>
            <Button className="btn-primary-custom" onClick={() => handleOpenModal()}>
              + Add New Initiative
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Period</th>
                <th>Achievements</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {impacts.map((impact) => (
                <tr key={impact._id}>
                  <td>{impact.title}</td>
                  <td>{impact.period}</td>
                  <td>{impact.achievements.length} achievements</td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      onClick={() => handleOpenModal(impact)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(impact._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for Add/Edit */}
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>
                {editingImpact ? 'Edit Impact Initiative' : 'Add New Initiative'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Period *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., 2023 - Present"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Achievements (one per line) *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter each achievement on a new line
                  </Form.Text>
                </Form.Group>

                <FileUpload
                  label="Main Image"
                  onUploadComplete={(url) => setFormData({ ...formData, image: url })}
                  accept="image/*"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ width: '200px', marginBottom: '1rem' }}
                  />
                )}

                <FileUpload
                  label="Gallery Images"
                  multiple
                  onUploadComplete={(url) =>
                    setFormData({ ...formData, gallery: [...formData.gallery, url] })
                  }
                  accept="image/*"
                />
                {formData.gallery.length > 0 && (
                  <div className="mb-3">
                    <p>Gallery: {formData.gallery.length} images</p>
                  </div>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Order</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button type="submit" className="btn-primary-custom">
                    {editingImpact ? 'Update' : 'Create'} Initiative
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

          <ToastContainer position="top-right" autoClose={3000} />
        </Container>
      </div>
    </div>
  );
};

export default ManageImpact;