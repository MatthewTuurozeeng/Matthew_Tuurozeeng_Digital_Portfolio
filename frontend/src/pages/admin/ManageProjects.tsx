import React, { useEffect, useState } from 'react';
import { Container, Button, Table, Modal, Form, Badge, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/admin/Sidebar';
import FileUpload from '../../components/admin/FileUpload';
import { adminProjectsApi } from '../../services/AdminApi';

interface Project {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image?: string;
  images?: string[];
  screenshots?: string[];
  demoVideo?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  status?: string;
}

// must match backend schema enum values (lowercase)
const CATEGORY_OPTIONS = ['web', 'mobile', 'desktop', 'ai-ml', 'data-science', 'other'];
const STATUS_OPTIONS = ['completed', 'in-progress', 'planned'];

const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'web',
    status: 'completed',
    image: '',
    screenshots: [] as string[],
    demoVideo: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    published: false,
    order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // pass ?all=true so admin sees published AND unpublished
      const response = await adminProjectsApi.getAll();
      const projectsWithId = response.data.map((p: any) => ({
        ...p,
        id: p.id || p._id,
      }));
      setProjects(projectsWithId);
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
        category: project.category || 'web',
        status: project.status || 'completed',
        image: project.image || (project.images && project.images[0]) || '',
        screenshots: project.screenshots || [],
        demoVideo: project.demoVideo || '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: project.featured,
        published: project.published ?? false,
        order: project.order,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '', description: '', technologies: '',
        category: 'web', status: 'completed',
        image: '', screenshots: [], demoVideo: '',
        githubUrl: '', liveUrl: '',
        featured: false, published: false, order: 0,
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

    if (!formData.title || !formData.description || !formData.technologies || !formData.image || !formData.category) {
      toast.error('Please fill in all required fields: title, description, technologies, image, category');
      return;
    }

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      // send both image and images[] so backend stores correctly
      image: formData.image,
      images: formData.image ? [formData.image, ...formData.screenshots] : formData.screenshots,
    };

    console.log('Submitting project data:', projectData);

    try {
      if (editingProject) {
        const id = editingProject.id || editingProject._id;
        if (!id) return toast.error('Project ID missing, cannot update.');
        await adminProjectsApi.update(id, projectData);
        toast.success('Project updated successfully!');
      } else {
        await adminProjectsApi.create(projectData);
        toast.success('Project created successfully!');
      }
      fetchProjects();
      handleCloseModal();
    } catch (error: any) {
      console.error('Failed to save project:', error);
      const msg = error.response?.data?.message || error.message || 'Failed to save project';
      toast.error(msg);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
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

  const handleTogglePublish = async (project: Project) => {
    const id = project.id || project._id;
    if (!id) return;
    try {
      await adminProjectsApi.update(id, { published: !project.published });
      toast.success(`Project ${!project.published ? 'published' : 'unpublished'}`);
      fetchProjects();
    } catch {
      toast.error('Failed to update publish status');
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
                <th>Category</th>
                <th>Technologies</th>
                <th>Featured</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project.id ?? project._id ?? index}>
                  <td>{project.title}</td>
                  <td>
                    <Badge bg="secondary">{project.category}</Badge>
                  </td>
                  <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {project.technologies.join(', ')}
                  </td>
                  <td>{project.featured ? '⭐ Yes' : 'No'}</td>
                  <td>
                    <Button
                      size="sm"
                      variant={project.published ? 'success' : 'outline-secondary'}
                      onClick={() => handleTogglePublish(project)}
                    >
                      {project.published ? '✅ Live' : '⬜ Draft'}
                    </Button>
                  </td>
                  <td>
                    <Button size="sm" variant="warning" className="me-2" onClick={() => handleOpenModal(project)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(project.id ?? project._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Add / Edit Modal */}
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

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category *</Form.Label>
                      <Form.Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      >
                        {CATEGORY_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <FileUpload
                  label="Project Image *"
                  onUploadComplete={(url) => setFormData({ ...formData, image: url })}
                  accept="image/*"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ width: '100%', maxHeight: 200, objectFit: 'cover', marginBottom: '1rem', borderRadius: 8 }}
                  />
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
                  <Form.Label>Order</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </Form.Group>

                <div className="d-flex gap-4 mb-3">
                  <Form.Check
                    type="switch"
                    id="featured-switch"
                    label="Featured Project"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <Form.Check
                    type="switch"
                    id="published-switch"
                    label="Published (visible on portfolio)"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
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
