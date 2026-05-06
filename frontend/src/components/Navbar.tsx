import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar as BSNavbar, NavDropdown } from 'react-bootstrap';

const Navbar: React.FC = () => {
  return (
    <BSNavbar expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <BSNavbar.Brand as={Link} to="/">
          Matthew Tuurozeeng | Software Engineer
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="navbar-nav" />
        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <NavDropdown title="Work" id="work-dropdown">
              <NavDropdown.Item as={Link} to="/projects">Projects</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/impact">Impact</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/cv">Curriculum Vitae (CV)</Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;