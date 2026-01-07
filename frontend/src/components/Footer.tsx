import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="footer-custom">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">© 2024 Professional Portfolio. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="me-3">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="me-3">
              GitHub
            </a>
            <a href="mailto:contact@example.com">
              Email
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;