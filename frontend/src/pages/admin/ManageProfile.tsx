import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/admin/Sidebar';
import FileUpload from '../../components/admin/FileUpload';
import { adminProfileApi } from '../../services/AdminApi';

const ManageProfile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await adminProfileApi.get();
      const profile = response.data;
      
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        bio: profile.bio || '',
        profileImage: profile.profileImage || '',
        heroBackground: profile.heroBackground || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        skills: {
          frontend: profile.skills?.frontend?.join(', ') || '',
          backend: profile.skills?.backend?.join(', ') || '',
          databases: profile.skills?.databases?.join(', ') || '',
          tools: profile.skills?.tools?.join(', ') || '',
        },
        careerGoals: profile.careerGoals || '',
        principles: profile.principles?.length > 0 ? profile.principles : [
          { title: '', description: '' },
          { title: '', description: '' },
          { title: '', description: '' },
        ],
        socialLinks: {
          linkedin: profile.socialLinks?.linkedin || '',
          github: profile.socialLinks?.github || '',
          twitter: profile.socialLinks?.twitter || '',
          website: profile.socialLinks?.website || '',
        },
        cvUrl: profile.cvUrl || '',
      });
    } catch (error) {
      console.log('No profile found, starting fresh');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const profileData = {
      ...formData,
      skills: {
        frontend: formData.skills.frontend.split(',').map((s) => s.trim()).filter(Boolean),
        backend: formData.skills.backend.split(',').map((s) => s.trim()).filter(Boolean),
        databases: formData.skills.databases.split(',').map((s) => s.trim()).filter(Boolean),
        tools: formData.skills.tools.split(',').map((s) => s.trim()).filter(Boolean),
      },
    };

    try {
      await adminProfileApi.upsert(profileData);
      toast.success('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePrincipleChange = (index: number, field: 'title' | 'description', value: string) => {
    const newPrinciples = [...formData.principles];
    newPrinciples[index][field] = value;
    setFormData({ ...formData, principles: newPrinciples });
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '2rem' }}>
        <Container fluid>
          <h2 className="mb-4">Manage Profile</h2>

          <Form onSubmit={handleSubmit}>
            <Card className="mb-4">
              <Card.Header>
                <h5>Basic Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
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
                        placeholder="e.g., Software Engineer & Problem Solver"
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
              <Card.Header>
                <h5>Images</h5>
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
                      <img
                        src={formData.profileImage}
                        alt="Profile"
                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                      />
                    )}
                  </Col>
                  <Col md={6}>
                    <FileUpload
                      label="Hero Background Image"
                      onUploadComplete={(url) => setFormData({ ...formData, heroBackground: url })}
                      accept="image/*"
                    />
                    {formData.heroBackground && (
                      <img
                        src={formData.heroBackground}
                        alt="Hero Background"
                        style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                      />
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Skills (comma separated)</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Frontend</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="React, JavaScript, TypeScript"
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
                      <Form.Label>Backend</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Node.js, Python, Django"
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
                        placeholder="MongoDB, PostgreSQL, MySQL"
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
                        placeholder="Git, Docker, AWS"
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
              <Card.Header>
                <h5>Career Goals & Principles</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Career Goals</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.careerGoals}
                    onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                  />
                </Form.Group>

                <h6 className="mt-4 mb-3">Core Principles</h6>
                {formData.principles.map((principle, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <Form.Group className="mb-2">
                      <Form.Label>Principle {index + 1} - Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={principle.title}
                        onChange={(e) => handlePrincipleChange(index, 'title', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={principle.description}
                        onChange={(e) => handlePrincipleChange(index, 'description', e.target.value)}
                      />
                    </Form.Group>
                  </div>
                ))}
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Social Links</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>LinkedIn</Form.Label>
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
                      <Form.Label>GitHub</Form.Label>
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
                      <Form.Label>Twitter</Form.Label>
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
                      <Form.Label>Website</Form.Label>
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
              <Card.Header>
                <h5>CV/Resume</h5>
              </Card.Header>
              <Card.Body>
                <FileUpload
                  label="Upload CV (PDF)"
                  onUploadComplete={(url) => setFormData({ ...formData, cvUrl: url })}
                  accept=".pdf"
                />
                {formData.cvUrl && (
                  <div className="mt-2">
                    <a href={formData.cvUrl} target="_blank" rel="noopener noreferrer">
                      View Current CV
                    </a>
                  </div>
                )}
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-end">
              <Button type="submit" className="btn-primary-custom" size="lg" disabled={loading}>
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </Form>

          <ToastContainer position="top-right" autoClose={3000} />
        </Container>
      </div>
    </div>
  );
};

export default ManageProfile;