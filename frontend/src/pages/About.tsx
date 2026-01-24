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
            I am Matthew Tuurozeeng, a Computer Science student at Ashesi University, born and raised in Ghana, with a strong interest in using 
            technology, entrepreneurship, and community-driven solutions to address real-world problems. 
            My journey into tech began with curiosity and has grown into a commitment to building impactful, 
            scalable systems that create social and economic value.
          </p>
          <p>
            As a Computer Science student, I worked on several academic and personal projects that strengthened 
            my foundation in full-stack development, algorithms, and system design. Beyond the classroom, I have 
            been actively involved in leadership and innovation fellowships, including the Jim Seech Mastercard 
            Foundation Fellowship on Entrepreneurship (Ghana Chapter) and the Millennium Fellowship, Class of 2025, 
            where I collaborated with other young leaders to design solutions aligned with the UN Sustainable 
            Development Goals.
          </p>
          <p>
            I am the Founder and CEO of <strong>Computing4All</strong>, a youth-led initiative focused on teaching 
            basic computing and digital skills to school children in underserved communities, with the aim of 
            bridging the digital divide. I am also the Co-founder of <strong>Sensorba Ltd</strong>, an agribusiness 
            working to formalize and add value to tiger nut production in Ghana's Upper West Region by improving 
            production practices, market access, and value addition.
          </p>
          <p>
            Through these experiences, I have developed strong skills in problem-solving, collaboration, and 
            leadership, alongside my technical expertise. I thrive in environments that challenge me to learn, 
            innovate, and contribute meaningfully, and I am motivated by opportunities that sit at the intersection 
            of technology, entrepreneurship, and social impact.
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