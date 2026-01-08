import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FileUpload from './FileUpload';

interface ImpactFormData {
  title: string;
  period: string;
  color: string;
  description: string;
  achievements: string;
  image: string;
  gallery: string[];
  order: number;
}

interface ImpactFormProps {
  initialData?: ImpactFormData;
  onSubmit: (data: ImpactFormData) => void;
  onCancel: () => void;
  submitButtonText?: string;
}

const ImpactForm: React.FC<ImpactFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText = 'Submit',
}) => {
  const [formData, setFormData] = useState<ImpactFormData>({
    title: '',
    period: '',
    color: '#994545',
    description: '',
    achievements: '',
    image: '',
    gallery: [],
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

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: newGallery });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Initiative Title *</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., Tech Community Leadership"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </Form.Group>

      <Row>
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label>Time Period *</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., 2023 - Present"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Theme Color</Form.Label>
            <div className="d-flex align-items-center gap-2">
              <Form.Control
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                style={{ width: '60px', height: '40px' }}
              />
              <Form.Control
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="#994545"
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Describe this initiative..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Achievements (one per line) *</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Organized 10+ technical workshops&#10;Mentored 50+ students&#10;Built collaborative learning programs"
          value={formData.achievements}
          onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
          required
        />
        <Form.Text className="text-muted">
          Enter each achievement on a new line. These will be displayed as bullet points.
        </Form.Text>
      </Form.Group>

      <FileUpload
        label="Main Image (Optional)"
        onUploadComplete={(url) => setFormData({ ...formData, image: url })}
        accept="image/*"
      />
      {formData.image && (
        <div className="mb-3">
          <img
            src={formData.image}
            alt="Impact preview"
            style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
      )}

      <FileUpload
        label="Gallery Images (Optional)"
        multiple
        onUploadComplete={(url) =>
          setFormData({ ...formData, gallery: [...formData.gallery, url] })
        }
        accept="image/*"
      />
      {formData.gallery.length > 0 && (
        <div className="mb-3">
          <p className="mb-2">Gallery ({formData.gallery.length} images):</p>
          <Row>
            {formData.gallery.map((image, index) => (
              <Col key={index} xs={6} md={3} className="mb-2">
                <div style={{ position: 'relative' }}>
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <Button
                    size="sm"
                    variant="danger"
                    style={{ position: 'absolute', top: '5px', right: '5px' }}
                    onClick={() => handleRemoveGalleryImage(index)}
                  >
                    ✕
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}

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

export default ImpactForm;