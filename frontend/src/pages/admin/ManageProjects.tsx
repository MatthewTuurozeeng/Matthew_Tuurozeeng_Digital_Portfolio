import React, { useEffect, useState } from 'react';
import { Container, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/admin/Sidebar';
import FileUpload from '../../components/admin/FileUpload';
import { adminProjectsApi } from '../../services/AdminApi';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  screenshots?: string[];
  demoVideo?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    screenshots: [] as string[],
    demoVideo: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await adminProjectsApi.getAll();
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '),
        image: project.image,
        screenshots: project.screenshots || [],
        demoVideo: project.demoVideo || '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: project.featured,
        order: project.order,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        image: '',
        screenshots: [],
        demoVideo: '',
        githubUrl: '',
        liveUrl: '',
        featured: false,
        order: 0,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map((tech) => tech.trim()),
    };

    try {
      if (editingProject) {
        await adminProjectsApi.update(editingProject._id, projectData);
        toast.success('Project updated successfully!');
      } else {
        await adminProjectsApi.create(projectData);
        toast.success('Project created successfully!');
      }
      fetchProjects();
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await adminProjectsApi.delete(id);
        toast.success('Project deleted successfully!');
        fetchProjects();
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '2rem' }}>
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Manage Projects</h2>
            <Button className="btn-primary-custom" onClick={() => handleOpenModal()}>
              + Add New Project
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Technologies</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>{project.technologies.join(', ')}</td>
                  <td>{project.featured ? '⭐ Yes' : 'No'}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      onClick={() => handleOpenModal(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(project._id)}
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
              <Modal.Title>{editingProject ? 'Edit Project' : 'Add New Project'}</Modal.Title>
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
                  <Form.Label>Technologies (comma separated) *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="React, Node.js, MongoDB"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    required
                  />
                </Form.Group>

                <FileUpload
                  label="Project Image *"
                  onUploadComplete={(url) => setFormData({ ...formData, image: url })}
                  accept="image/*"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" style={{ width: '200px', marginBottom: '1rem' }} />
                )}

                <Form.Group className="mb-3">
                  <Form.Label>GitHub URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Live URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Featured Project"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                </Form.Group>

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
                    {editingProject ? 'Update' : 'Create'} Project
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

export default ManageProjects;