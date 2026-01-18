import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PROFILE_IMAGE } from "../constants/media";

interface Skill {
  category: string;
  skills: string[];
}

interface Principle {
  title: string;
  description: string;
  color: string;
}

const About: React.FC = () => {
  const skills: Skill[] = [
    {
      category: 'Frontend',
      skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Bootstrap']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Python', 'Django', 'Express', 'REST APIs']
    },
    {
      category: 'Databases',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis']
    },
    {
      category: 'Tools & Others',
      skills: ['Git', 'Docker', 'AWS', 'Linux', 'Agile']
    }
  ];

  const principles: Principle[] = [
    {
      title: 'Quality First',
      description: 'Writing clean, maintainable code with comprehensive testing',
      color: '#9C484F'
    },
    {
      title: 'Collaboration',
      description: 'Working effectively in teams and contributing to shared success',
      color: '#997446'
    },
    {
      title: 'Continuous Growth',
      description: 'Always learning new technologies and improving existing skills',
      color: '#994545'
    }
  ];

  return (
    <Container className="py-5">
      <h2 className="section-title">About Me</h2>

      {/* <Row className="align-items-center mt-5 mb-5"> */}
        <Row className="align-items-center justify-content-center">
        {/* Profile Image */}
        <Col lg={5} className="text-center mb-4 mb-lg-0">
          <img
            src={PROFILE_IMAGE}
            alt="Matthew Tuurozeeng"
            className="about-profile-image"
          />
        </Col>

        {/* Intro Text */}
        <Col lg={7}>
          <h3 style={{ color: '#994545' }}>Background</h3>
          <p className="lead">
            I am a dedicated Computer Science student with a passion for building innovative 
            software solutions. My journey in technology began with curiosity and has evolved 
            into a commitment to creating meaningful applications that solve real-world problems.
          </p>
          <p>
            Through academic projects and personal initiatives, I have developed strong skills 
            in full-stack development, algorithm design, and system architecture. I thrive in 
            collaborative environments and enjoy tackling complex challenges.
          </p>
        </Col>
      </Row>

      
      <div className="mt-5">
        <h3 style={{ color: '#994545' }} className="mb-4">Technical Skills</h3>
        <Row>
          {skills.map((skillGroup, index) => (
            <Col key={index} md={6} className="mb-4">
              <h5>{skillGroup.category}</h5>
              <div>
                {skillGroup.skills.map((skill, idx) => (
                  <span key={idx} className="skill-badge">
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
          {principles.map((principle, index) => (
            <Col key={index} md={4} className="mb-3">
              <Card className="card-custom">
                <Card.Body>
                  <h5 style={{ color: principle.color }}>{principle.title}</h5>
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