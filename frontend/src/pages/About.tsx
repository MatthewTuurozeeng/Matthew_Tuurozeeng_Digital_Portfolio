

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import profileData from '../data/Profile';

interface Skill {
  category: string;
  skills: string[];
}

interface Principle {
  title: string;
  description: string;
  color?: string;
}

const About: React.FC = () => {
  const {
    name,
    title,
    bio,
    profileImage,
    careerGoals,
    skills,
    principles,
  } = profileData;

  const skillGroups: Skill[] = [
    { category: 'Frontend', skills: skills.frontend },
    { category: 'Backend', skills: skills.backend },
    { category: 'Databases', skills: skills.databases },
    { category: 'Tools & Others', skills: skills.tools },
  ];

  return (
    <Container className="py-5">
      <h2 className="section-title">About Me</h2>

      <Row className="align-items-center justify-content-center">
        <Col lg={5} className="text-center mb-4 mb-lg-0">
          <img
            src={profileImage}
            alt={name}
            className="about-profile-image"
          />
        </Col>

        <Col lg={7}>
          <h3 style={{ color: '#994545' }}>{title}</h3>
          {/* <p className="lead">{bio}</p> */}
          <p style={{ whiteSpace: 'pre-line' }}>{careerGoals}</p>
        </Col>
      </Row>

      <div className="mt-5">
        <h3 style={{ color: '#994545' }} className="mb-4">Technical Skills</h3>
        <Row>
          {skillGroups.map((group) => (
            <Col key={group.category} md={6} className="mb-4">
              <h5>{group.category}</h5>
              <div>
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="mt-5">
        <h3 style={{ color: '#994545' }}>Core Principles</h3>
        <Row className="mt-4">
          {principles.map((principle: Principle) => (
            <Col key={principle.title} md={4} className="mb-3">
              <Card className="card-custom">
                <Card.Body>
                  <h5 style={{ color: principle.color || '#994545' }}>{principle.title}</h5>
                  <p>{principle.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default About;