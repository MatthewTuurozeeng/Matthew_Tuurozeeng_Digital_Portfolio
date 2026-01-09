import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FileUpload from './FileUpload';

interface ProjectFormData {
  title: string;
  description: string;
  technologies: string;
  image: string;
  screenshots: string[];
  demoVideo: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
}

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  submitButtonText?: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText = 'Submit',
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleRemoveScreenshot = (index: number) => {
    const newScreenshots = formData.screenshots.filter((_, i) => i !== index);
    setFormData({ ...formData, screenshots: newScreenshots });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Project Title *</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., E-Commerce Platform"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Describe your project..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Technologies (comma separated) *</Form.Label>
        <Form.Control
          type="text"
          placeholder="React, Node.js, MongoDB, Express"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          required
        />
        <Form.Text className="text-muted">
          Separate each technology with a comma
        </Form.Text>
      </Form.Group>

      <FileUpload
        label="Main Project Image *"
        onUploadComplete={(url) => setFormData({ ...formData, image: url })}
        accept="image/*"
      />
      {formData.image && (
        <div className="mb-3">
          <img
            src={formData.image}
            alt="Project preview"
            style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
      )}

      <FileUpload
        label="Screenshots (Optional)"
        multiple
        onUploadComplete={(url) =>
          setFormData({ ...formData, screenshots: [...formData.screenshots, url] })
        }
        accept="image/*"
      />
      {formData.screenshots.length > 0 && (
        <div className="mb-3">
          <p className="mb-2">Screenshots ({formData.screenshots.length}):</p>
          <Row>
            {formData.screenshots.map((screenshot, index) => (
              <Col key={index} xs={6} md={3} className="mb-2">
                <div style={{ position: 'relative' }}>
                  <img
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <Button
                    size="sm"
                    variant="danger"
                    style={{ position: 'absolute', top: '5px', right: '5px' }}
                    onClick={() => handleRemoveScreenshot(index)}
                  >
                    ✕
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}

      <FileUpload
        label="Demo Video (Optional)"
        onUploadComplete={(url) => setFormData({ ...formData, demoVideo: url })}
        accept="video/*"
      />
      {formData.demoVideo && (
        <div className="mb-3">
          <p className="text-success">✓ Video uploaded</p>
        </div>
      )}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>GitHub URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://github.com/username/project"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Live Demo URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://project-demo.com"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Featured Project"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <Form.Text className="text-muted">
              Featured projects appear at the top
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Display Order</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            />
            <Form.Text className="text-muted">
              Lower numbers appear first
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="btn-primary-custom">
          {submitButtonText}
        </Button>
      </div>
    </Form>
  );
};

export default ProjectForm;