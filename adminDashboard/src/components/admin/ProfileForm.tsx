import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import FileUpload from './FileUpload';

interface ProfileFormData {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  heroBackground: string;
  email: string;
  phone: string;
  location: string;
  skills: {
    frontend: string;
    backend: string;
    databases: string;
    tools: string;
  };
  careerGoals: string;
  principles: Array<{
    title: string;
    description: string;
  }>;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    website: string;
  };
  cvUrl: string;
}

interface ProfileFormProps {
  initialData?: ProfileFormData;
  onSubmit: (data: ProfileFormData) => void;
  submitButtonText?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSubmit,
  submitButtonText = 'Save Profile',
}) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    heroBackground: '',
    email: '',
    phone: '',
    location: '',
    skills: {
      frontend: '',
      backend: '',
      databases: '',
      tools: '',
    },
    careerGoals: '',
    principles: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      website: '',
    },
    cvUrl: '',
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

  const handlePrincipleChange = (
    index: number,
    field: 'title' | 'description',
    value: string
  ) => {
    const newPrinciples = [...formData.principles];
    newPrinciples[index][field] = value;
    setFormData({ ...formData, principles: newPrinciples });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#994545', color: 'white' }}>
          <h5 className="mb-0">Basic Information</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Professional Title *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Software Engineer & Problem Solver"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Bio *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Tell your story..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#9C484F', color: 'white' }}>
          <h5 className="mb-0">Images</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <FileUpload
                label="Profile Image *"
                onUploadComplete={(url) => setFormData({ ...formData, profileImage: url })}
                accept="image/*"
              />
              {formData.profileImage && (
                <div className="text-center mb-3">
                  <img
                    src={formData.profileImage}
                    alt="Profile preview"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      border: '4px solid #994545',
                    }}
                  />
                </div>
              )}
            </Col>
            <Col md={6}>
              <FileUpload
                label="Hero Background Image"
                onUploadComplete={(url) => setFormData({ ...formData, heroBackground: url })}
                accept="image/*"
              />
              {formData.heroBackground && (
                <div className="mb-3">
                  <img
                    src={formData.heroBackground}
                    alt="Hero background preview"
                    style={{
                      width: '100%',
                      maxHeight: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#997446', color: 'white' }}>
          <h5 className="mb-0">Skills</h5>
        </Card.Header>
        <Card.Body>
          <Form.Text className="d-block mb-3 text-muted">
            Enter skills separated by commas (e.g., React, TypeScript, Node.js)
          </Form.Text>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Frontend Technologies</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="React, JavaScript, TypeScript, HTML, CSS"
                  value={formData.skills.frontend}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: { ...formData.skills, frontend: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Backend Technologies</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Node.js, Python, Django, Express"
                  value={formData.skills.backend}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: { ...formData.skills, backend: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Databases</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MongoDB, PostgreSQL, MySQL, Redis"
                  value={formData.skills.databases}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: { ...formData.skills, databases: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tools & Others</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Git, Docker, AWS, Linux, Agile"
                  value={formData.skills.tools}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: { ...formData.skills, tools: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#994545', color: 'white' }}>
          <h5 className="mb-0">Career Goals & Principles</h5>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-4">
            <Form.Label>Career Goals</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What are your professional aspirations?"
              value={formData.careerGoals}
              onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
            />
          </Form.Group>

          <h6 className="mb-3">Core Principles</h6>
          {formData.principles.map((principle, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <Form.Group className="mb-2">
                <Form.Label>Principle {index + 1} - Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Quality First"
                  value={principle.title}
                  onChange={(e) => handlePrincipleChange(index, 'title', e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Describe this principle..."
                  value={principle.description}
                  onChange={(e) => handlePrincipleChange(index, 'description', e.target.value)}
                />
              </Form.Group>
            </div>
          ))}
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#9C484F', color: 'white' }}>
          <h5 className="mb-0">Social Links</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-linkedin"></i> LinkedIn
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-github"></i> GitHub
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://github.com/username"
                  value={formData.socialLinks.github}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, github: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-twitter"></i> Twitter
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://twitter.com/username"
                  value={formData.socialLinks.twitter}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-globe"></i> Website
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={formData.socialLinks.website}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, website: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#997446', color: 'white' }}>
          <h5 className="mb-0">CV/Resume</h5>
        </Card.Header>
        <Card.Body>
          <FileUpload
            label="Upload CV (PDF)"
            onUploadComplete={(url) => setFormData({ ...formData, cvUrl: url })}
            accept=".pdf,application/pdf"
          />
          {formData.cvUrl && (
            <div className="mt-2">
              
                href={formData.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                📄 View Current CV
              </a>
            </div>
          )}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end">
        <Button type="submit" className="btn-primary-custom" size="lg">
          {submitButtonText}
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;