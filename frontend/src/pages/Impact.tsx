import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface Initiative {
  title: string;
  period: string;
  color: string;
  description: string;
  achievements: string[];
}

const Impact: React.FC = () => {
  const initiatives: Initiative[] = [
    {
      title: 'Tech Community Leadership',
      period: '2023 - Present',
      color: '#994545',
      description: 'Leading a student tech community focused on mentoring aspiring developers and organizing workshops on modern web development, algorithms, and career preparation.',
      achievements: [
        'Organized 10+ technical workshops',
        'Mentored 50+ students',
        'Built collaborative learning programs'
      ]
    },
    {
      title: 'Open Source Contributions',
      period: '2022 - Present',
      color: '#9C484F',
      description: 'Active contributor to open source projects, focusing on improving documentation, fixing bugs, and adding new features to help the developer community.',
      achievements: [
        'Contributed to 15+ repositories',
        'Improved project documentation',
        'Collaborated with global developers'
      ]
    },
    {
      title: 'Educational Fellowship',
      period: '2023',
      color: '#997446',
      description: 'Selected for a competitive fellowship program focused on using technology for educational access in underserved communities.',
      achievements: [
        'Developed learning platform prototype',
        'Collaborated with NGOs',
        'Trained local educators on tech tools'
      ]
    },
    {
      title: 'Hackathon Organizer',
      period: '2022 - 2023',
      color: '#994545',
      description: 'Co-organized regional hackathons bringing together students and professionals to solve local challenges through technology.',
      achievements: [
        '200+ participants across 3 events',
        'Secured corporate sponsorships',
        'Facilitated networking opportunities'
      ]
    }
  ];
  
  return (
    <Container className="py-5">
      <h2 className="section-title">Impact & Leadership</h2>
      <p className="lead mb-5">
        Community engagement, fellowships, and social initiatives
      </p>
      
      <Row>
        {initiatives.map((initiative, index) => (
          <Col key={index} lg={6} className="mb-4">
            <Card className="card-custom">
              <Card.Body>
                <h4 style={{ color: initiative.color }}>{initiative.title}</h4>
                <p className="text-muted mb-3">{initiative.period}</p>
                <p>{initiative.description}</p>
                <ul>
                  {initiative.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Impact;