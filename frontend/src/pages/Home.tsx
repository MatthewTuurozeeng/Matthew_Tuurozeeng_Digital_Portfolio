import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PROFILE_IMAGE, HERO_BACKGROUND } from '../constants/media';
import profileData from '../data/Profile';
import projectsData from '../data/Projects';
import impactData from '../data/Impact';
import Timeline, { TimelineItem } from '../components/Timeline';
import fullstackImg from "/assets/images/homeImages/full-stack.jpg";
import learningImg from "/assets/images/homeImages/learning.jpg";
import innovationImg from "/assets/images/homeImages/innovate.jpg";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { name, title, bio, profileImage } = profileData;
  const stats = [
    { label: 'Projects Delivered', value: projectsData.length },
    { label: 'Impact Initiatives', value: impactData.length },
    { label: 'Technologies Mastered', value: profileData.skills.frontend.length + profileData.skills.backend.length + profileData.skills.databases.length + profileData.skills.tools.length },
  ];

  const availabilityTimeline: TimelineItem[] = [
    {
      title: 'Open to Internships',
      subtitle: 'Frontend, Full-Stack, Product Engineering',
      duration: 'From now onwards',
      description: 'Actively seeking internships or part-time roles that focus on web products and user experience.',
      details: ['Remote or on-site opportunities', 'Mentorship-focused engineering teams'],
    },
    {
      title: 'Research & Impact Collaborations',
      subtitle: 'Civic tech, education, youth leadership',
      duration: '2024 - Present',
      description: 'Open to collaborating on projects that use technology for social impact and community development.',
      details: ['Data storytelling or dashboarding', 'Community programs and digital literacy'],
    },
    {
      title: 'Full-Time Roles',
      subtitle: 'Software Engineer / Product Builder',
      duration: 'From now onwards',
      description: 'Preparing for full-time roles after graduation with a focus on building scalable web systems.',
      details: ['Frontend and backend ownership', 'Cross-functional product teams'],
    },
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
        <div className="availability-section mb-5">
          <div className="availability-header">
            <h3>Open To</h3>
            <p>
              Current availability and roles I am actively pursuing. Feel free to reach out if there is a fit.
            </p>
          </div>
          <Timeline items={availabilityTimeline} variant="education" />
        </div>
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
      <div className="feature-card">
        <img
          src={fullstackImg}
          alt="Full-Stack Development"
          className="feature-image"
        />

        <h4 className="feature-title">
          Full-Stack Development
        </h4>

        <p className="feature-text">
          Building scalable web applications with modern technologies
        </p>
      </div>
    </Col>

    <Col md={4} className="mb-4">
      <div className="feature-card">
        <img
          src={learningImg}
          alt="Continuous Learning"
          className="feature-image"
        />

        <h4 className="feature-title">
          Continuous Learning
        </h4>

        <p className="feature-text">
          Passionate about staying current with industry trends
        </p>
      </div>
    </Col>

    <Col md={4} className="mb-4">
      <div className="feature-card">
        <img
          src={innovationImg}
          alt="Innovation"
          className="feature-image"
        />

        <h4 className="feature-title">
          Innovation
        </h4>

        <p className="feature-text">
          Creating solutions that make a real-world impact
        </p>
      </div>
    </Col>

  </Row>
</Container>
    </>
  );
};

export default Home;