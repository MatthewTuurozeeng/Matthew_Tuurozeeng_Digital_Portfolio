import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsLinkedin, BsGithub, BsEnvelope } from 'react-icons/bs';


const Footer: React.FC = () => {
  return (
    <footer className="footer-custom">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">© 2026 Matthew Tuurozeeng's Professional Portfolio. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end d-flex justify-content-center justify-content-md-end gap-3">
            <a className="footer-link" href="https://www.linkedin.com/in/matthewtuurozeeng" target="_blank" rel="noopener noreferrer">
              <BsLinkedin size={18} className="me-1" /> LinkedIn
            </a>
            <a className="footer-link" href="https://github.com/MatthewTuurozeeng" target="_blank" rel="noopener noreferrer">
              <BsGithub size={18} className="me-1" /> GitHub
            </a>
            <a className="footer-link" href="mailto:tuurozeengmatthew@ashesi.edu.gh">
              <BsEnvelope size={18} className="me-1" /> Email
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;