import React, { useEffect, useState } from 'react';
import { Container, Button, Table, Modal, Badge, Tabs, Tab } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/admin/Sidebar';
import CVForm from '../../components/admin/CVForm';
import { adminCVApi } from '../../services/AdminApi';

interface CV {
  _id: string;
  type: 'master' | 'resume';
  personalInfo: {
    name: string;
    email: string;
  };
  isActive: boolean;
  pdfUrl?: string;
  createdAt: string;
}

const ManageCV: React.FC = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCV, setEditingCV] = useState<any | null>(null);
  const [cvType, setCvType] = useState<'master' | 'resume'>('master');

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const response = await adminCVApi.getAll();
      setCvs(response.data);
    } catch (error) {
      toast.error('Failed to fetch CVs');
    }
  };

  const handleOpenModal = async (cv?: CV) => {
    if (cv) {
      try {
        const response = await adminCVApi.getById(cv._id);
        setEditingCV(response.data);
        setCvType(response.data.type);
      } catch (error) {
        toast.error('Failed to load CV details');
        return;
      }
    } else {
      setEditingCV(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCV(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingCV) {
        await adminCVApi.update(editingCV._id, data);
        toast.success('CV updated successfully!');
      } else {
        await adminCVApi.create(data);
        toast.success('CV created successfully!');
      }
      fetchCVs();
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to save CV');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this CV?')) {
      try {
        await adminCVApi.delete(id);
        toast.success('CV deleted successfully!');
        fetchCVs();
      } catch (error) {
        toast.error('Failed to delete CV');
      }
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      await adminCVApi.toggleActive(id);
      toast.success('CV status updated!');
      fetchCVs();
    } catch (error) {
      toast.error('Failed to update CV status');
    }
  };

  const masterCVs = cvs.filter((cv) => cv.type === 'master');
  const resumeCVs = cvs.filter((cv) => cv.type === 'resume');

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '2rem' }}>
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Manage CV & Resume</h2>
          </div>

          <Tabs defaultActiveKey="master" className="mb-4">
            <Tab eventKey="master" title="Master CV">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="text-muted mb-0">
                  Comprehensive CV with all experiences (View only on website)
                </p>
                <Button
                  className="btn-primary-custom"
                  onClick={() => {
                    setCvType('master');
                    handleOpenModal();
                  }}
                >
                  + Add Master CV
                </Button>
              </div>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {masterCVs.map((cv) => (
                    <tr key={cv._id}>
                      <td>{cv.personalInfo.name}</td>
                      <td>{cv.personalInfo.email}</td>
                      <td>
                        {cv.isActive ? (
                          <Badge bg="success">Active</Badge>
                        ) : (
                          <Badge bg="secondary">Inactive</Badge>
                        )}
                      </td>
                      <td>{new Date(cv.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => handleOpenModal(cv)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant={cv.isActive ? 'secondary' : 'success'}
                          className="me-2"
                          onClick={() => handleToggleActive(cv._id)}
                        >
                          {cv.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(cv._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {masterCVs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No Master CV created yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Tab>

            <Tab eventKey="resume" title="Resume">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="text-muted mb-0">
                  Tailored resume for job applications (Downloadable on website)
                </p>
                <Button
                  className="btn-primary-custom"
                  onClick={() => {
                    setCvType('resume');
                    handleOpenModal();
                  }}
                >
                  + Add Resume
                </Button>
              </div>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>PDF</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resumeCVs.map((cv) => (
                    <tr key={cv._id}>
                      <td>{cv.personalInfo.name}</td>
                      <td>{cv.personalInfo.email}</td>
                      <td>
                        {cv.pdfUrl ? (
                          <a href={cv.pdfUrl} target="_blank" rel="noopener noreferrer">
                            View PDF
                          </a>
                        ) : (
                          <span className="text-muted">No PDF</span>
                        )}
                      </td>
                      <td>
                        {cv.isActive ? (
                          <Badge bg="success">Active</Badge>
                        ) : (
                          <Badge bg="secondary">Inactive</Badge>
                        )}
                      </td>
                      <td>{new Date(cv.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => handleOpenModal(cv)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant={cv.isActive ? 'secondary' : 'success'}
                          className="me-2"
                          onClick={() => handleToggleActive(cv._id)}
                        >
                          {cv.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(cv._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {resumeCVs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No Resume created yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Tab>
          </Tabs>

          {/* Modal for Add/Edit */}
          <Modal show={showModal} onHide={handleCloseModal} size="xl" scrollable>
            <Modal.Header closeButton>
              <Modal.Title>
                {editingCV ? `Edit ${cvType === 'master' ? 'Master CV' : 'Resume'}` : `Add New ${cvType === 'master' ? 'Master CV' : 'Resume'}`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CVForm
                initialData={editingCV}
                cvType={cvType}
                onSubmit={handleSubmit}
                onCancel={handleCloseModal}
              />
            </Modal.Body>
          </Modal>

          <ToastContainer position="top-right" autoClose={3000} />
        </Container>
      </div>
    </div>
  );
};

export default ManageCV;