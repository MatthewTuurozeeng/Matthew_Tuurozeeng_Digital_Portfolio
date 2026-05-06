import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import profileData from '../data/Profile';
import Timeline, { TimelineItem } from '../components/Timeline';

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
  const { name, title, bio, profileImage, careerGoals, skills, principles } = profileData;

  const skillGroups: Skill[] = [
    { category: 'Frontend', skills: skills.frontend },
    { category: 'Backend', skills: skills.backend },
    { category: 'Databases', skills: skills.databases },
    { category: 'Tools & Others', skills: skills.tools },
  ];

  const educationTimeline: TimelineItem[] = [
    {
      title: 'Ashesi University',
      subtitle: 'BSc. Computer Science',
      duration: '2023 - Present',
      description: 'Focused on full-stack development, data analysis, and building scalable software systems.',
      details: [
        'Relevant coursework: Data Structures, Algorithm Design and Analyis, Computer Organization and Architceture, Web Development, Databases, Software Engineering',
        'Leadership & service: community-driven tech initiatives and mentoring',
      ],
    },
    {

  title: "Nandom Senior High School (St. Michael's Boys)",

  subtitle: "General Science",

  duration: "Aug 2019  - Jun 2022",

  description: "Completed secondary education in General Science, developing a strong foundation in analytical reasoning and problem-solving.",

  details: [

    "Studied core science subjects: Physics, Chemistry, Biology, and Mathematics",

    "Strengthened critical thinking and quantitative analysis through rigorous coursework",

    "Awarded West African Senior School Certificate Examination (WASSCE)",

    "Ranked among the top-performing students in the 2022 WASSCE cohort in the School",

    "Actively engaged in academic and school-based activities"

  ]

}, 
{
  title: "Machris Christian Academy",
  subtitle: "Basic Education",
  duration: "2017  -  2019",
  description: "Completed basic education with strong academic performance, building foundational skills in Literacy, Numeracy, and general Academics.",
  details: [
    "Sat for and completed the Basic Education Certificate Examination (BECE)",
    "Ranked as the best-performing student in the school for BECE",
    "Placed among the top 3 BECE candidates in the district",
  ]
}
  ];

  const experienceTimeline: TimelineItem[] = [
    {
      title: 'Social Media Design Consultant (Volunteer)',
      subtitle: 'Talloires Network of Engaged Universities, Tufts University',
      duration: 'Feb 2026 - Present',
      description: 'Design social media content and provide creative guidance to enhance digital engagement and outreach.',
      challenges: ['Maintaining consistent visual identity across multiple campaigns', 'Balancing storytelling with limited time and resources'],
      achievements: ['Built reusable content templates to speed up production', 'Improved campaign clarity and engagement through improved layouts'],
    },

    {
      title: 'Founder & Program Lead',
      subtitle: 'Computing4All Initiative',
      duration: '2025 - Present',
      description: 'Community digital literacy program teaching schoolchildren foundational computing skills.',
      challenges: ['Limited access to devices and stable internet', 'Designing lessons suitable for mixed learning levels'],
      achievements: ['Delivered hands-on sessions to 25+ learners', 'Built a repeatable curriculum for future cohorts'],
    },
    {
      title: 'Founder & CEO',
      subtitle: 'Sensorba LTD',
      duration: '2024  - Present',
      description: 'Leading an agribusiness venture focused on improving tiger nut production, value addition, and market access.',
      challenges: ['Coordinating production logistics across rural communities', 'Building a reliable supply chain with limited digital infrastructure'],
      achievements: ['Launched pilot production cycles and formalized farmer partnerships', 'Applied product/tech thinking to streamline operations'],
    },

    {
      title: 'Machris Christian Academy',
      subtitle: 'BECE Preparation & Alumni Service',
      duration: 'Oct 2022 - Dec 2023',
      description: 'Returned to mentor and tutor students, supporting two BECE cohorts with structured revision programs.',
      details: ['Delivered weekly tutoring and mock exams', 'Improved learner confidence and exam readiness'],
    },
  
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container className="py-5">
      <h2 className="section-title">About Me</h2>

      <Row className="align-items-center justify-content-center">
        <Col lg={5} className="text-center mb-4 mb-lg-0">
          <img src={profileImage} alt={name} className="about-profile-image" />
        </Col>

        <Col lg={7}>
          <h3 style={{ color: '#994545' }}>{title}</h3>
          <p className="lead">{bio}</p>
          <p style={{ whiteSpace: 'pre-line' }}>{careerGoals}</p>
        </Col>
      </Row>

      <div className="mt-5 flex flex-wrap gap-4">
        <button
          onClick={() => scrollTo('education')}
          className="px-4 py-2 rounded-full border border-[#994545] text-[#994545] hover:bg-[#994545] hover:text-white transition"
        >
          Education
        </button>
        <button
          onClick={() => scrollTo('experience')}
          className="px-4 py-2 rounded-full border border-[#994545] text-[#994545] hover:bg-[#994545] hover:text-white transition"
        >
          Experience
        </button>
      </div>

      <div className="mt-5">
        <h3 style={{ color: '#994545' }} className="mb-4">
          Technical Skills
        </h3>
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

      <div id="education" className="mt-5">
        <h3 className="text-[#994545] text-2xl font-semibold mb-4">Education</h3>
        <Timeline items={educationTimeline} variant="Education" />
      </div>

      <div id="experience" className="mt-5">
        <h3 className="text-[#994545] text-2xl font-semibold mb-4">Work Experience</h3>
        <Timeline items={experienceTimeline} variant="Experience" />
      </div>
    </Container>
  );
};

export default About;