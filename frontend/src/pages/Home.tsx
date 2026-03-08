import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PROFILE_IMAGE, HERO_BACKGROUND } from '../constants/media';
import profileData from '../data/Profile';
import projectsData from '../data/Projects';
import impactData from '../data/Impact';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { name, title, bio, profileImage } = profileData;
  const stats = [
    { label: 'Projects Delivered', value: projectsData.length },
    { label: 'Impact Initiatives', value: impactData.length },
    { label: 'Technologies Mastered', value: profileData.skills.frontend.length + profileData.skills.backend.length + profileData.skills.databases.length + profileData.skills.tools.length },
  ];

  return (
    <>
      <div
        className="hero-section text-center"
        style={{
          backgroundImage: `
              linear-gradient(
                rgba(0, 0, 0, 0.45),
                rgba(0, 0, 0, 0.45)
              ),
              url(${HERO_BACKGROUND})
            `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <div className="mb-4">
            <img
              src={profileImage || PROFILE_IMAGE}
              alt={name}
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '5px solid white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
              onError={(e) => {
                e.currentTarget.src = PROFILE_IMAGE;
              }}
            />
          </div>

          <h1 className="display-3 fw-bold mb-2">{name}</h1>
          <h3 className="fw-semibold mb-4">{title}</h3>
          <p className="lead mb-5">{bio}</p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button onClick={() => navigate('/projects')} className="btn-primary-custom" size="lg">
              View Projects
            </Button>
            <Button
              as="a"
              href="/documents/Matthew_Tuurozeeng_Resume.pdf"
              download
              className="btn-secondary-custom"
              size="lg"
            >
              Download Resume
            </Button>
            <Button onClick={() => navigate('/contact')} variant="outline-light" size="lg">
              Contact Me
            </Button>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="text-center mb-5">
          {stats.map((stat) => (
            <Col key={stat.label} md={4} className="mb-4">
              <div className="p-4 shadow-sm rounded" style={{ background: '#fff5f5' }}>
                <div style={{ fontSize: '3rem', color: '#994545', fontWeight: 700 }}>
                  {stat.value}+
                </div>
                <p className="fw-semibold mb-0">{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-5">
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <div className="p-4">
              <div style={{ fontSize: '6rem' }}>💻</div>
              <h4 className="mt-3">Full-Stack Development</h4>
              <p>Building scalable web applications with modern technologies</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="p-4">
              <div style={{ fontSize: '6rem' }}>🎓</div>
              <h4 className="mt-3">Continuous Learning</h4>
              <p>Passionate about staying current with industry trends</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="p-4">
              <div style={{ fontSize: '6rem' }}>🚀</div>
              <h4 className="mt-3">Innovation</h4>
              <p>Creating solutions that make a real-world impact</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;