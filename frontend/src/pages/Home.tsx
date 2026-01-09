import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PROFILE_IMAGE, HERO_BACKGROUND } from '../constants/media';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
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
          {/* Profile Picture */}
          <div className="mb-4">
            <img
              src={PROFILE_IMAGE}
              alt="Profile"
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '5px solid white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/180/994545/FFFFFF?text=Profile';
              }}
            />
          </div>

          <h1 className="display-3 fw-bold mb-4">
            Software Engineer & Problem Solver
          </h1>
          <p className="lead mb-5">
            Computer Science Student | Full-Stack Developer | Tech Enthusiast
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button 
              onClick={() => navigate('/projects')} 
              className="btn-primary-custom" 
              size="lg"
            >
              View Projects
            </Button>
            <Button 
              as="a"
              href="/documents/cv.pdf" 
              download 
              className="btn-secondary-custom" 
              size="lg"
            >
              Download CV
            </Button>
            <Button 
              onClick={() => navigate('/contact')} 
              variant="outline-light" 
              size="lg"
            >
              Contact Me
            </Button>
          </div>
        </Container>
      </div>
      
      <Container className="py-5">
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <div className="p-4">
              <div style={{ fontSize: '3rem' }}>💻</div>
              <h4 className="mt-3">Full-Stack Development</h4>
              <p>Building scalable web applications with modern technologies</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="p-4">
              <div style={{ fontSize: '3rem' }}>🎓</div>
              <h4 className="mt-3">Continuous Learning</h4>
              <p>Passionate about staying current with industry trends</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="p-4">
              <div style={{ fontSize: '3rem' }}>🚀</div>
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