import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, Badge } from 'react-bootstrap';
import ImageWithFallback from '../components/ImageWithFallback';
import ImageGallery from '../components/ImageGallery';
import { getImpactInitiatives, ImpactInitiative } from '../services/api';
import { IMPACT_IMAGES } from '../constants/media';

// hardcoded fallback — shown only when API is unreachable
const FALLBACK_INITIATIVES: ImpactInitiative[] = [
  {
    id: 'fallback-1',
    title: 'Tech Community Leadership',
    period: '2023 - Present',
    color: '#994545',
    description:
      'Leading a student tech community focused on mentoring aspiring developers and organizing workshops on modern web development, algorithms, and career preparation.',
    category: 'community',
    achievements: [
      'Organized 10+ technical workshops',
      'Mentored 50+ students',
      'Built collaborative learning programs',
    ],
    image: IMPACT_IMAGES.techCommunity,
    gallery: [
      '/images/impact/workshop-1.jpg',
      '/images/impact/workshop-2.jpg',
      '/images/impact/workshop-3.jpg',
      '/images/impact/workshop-4.jpg',
    ],
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 'fallback-2',
    title: 'Open Source Contributions',
    period: '2022 - Present',
    color: '#9C484F',
    description:
      'Active contributor to open source projects, focusing on improving documentation, fixing bugs, and adding new features to help the developer community.',
    category: 'tech',
    achievements: [
      'Contributed to 15+ repositories',
      'Improved project documentation',
      'Collaborated with global developers',
    ],
    image: IMPACT_IMAGES.openSource,
    featured: false,
    published: true,
    order: 2,
  },
  {
    id: 'fallback-3',
    title: 'Educational Fellowship',
    period: '2023',
    color: '#997446',
    description:
      'Selected for a competitive fellowship program focused on using technology for educational access in underserved communities.',
    category: 'education',
    achievements: [
      'Developed learning platform prototype',
      'Collaborated with NGOs',
      'Trained local educators on tech tools',
    ],
    image: IMPACT_IMAGES.fellowship,
    gallery: [
      '/images/impact/fellowship-1.jpg',
      '/images/impact/fellowship-2.jpg',
    ],
    featured: false,
    published: true,
    order: 3,
  },
  {
    id: 'fallback-4',
    title: 'Hackathon Organizer',
    period: '2022 - 2023',
    color: '#994545',
    description:
      'Co-organized regional hackathons bringing together students and professionals to solve local challenges through technology.',
    category: 'community',
    achievements: [
      '200+ participants across 3 events',
      'Secured corporate sponsorships',
      'Facilitated networking opportunities',
    ],
    image: IMPACT_IMAGES.hackathon,
    gallery: [
      '/images/impact/hackathon-1.jpg',
      '/images/impact/hackathon-2.jpg',
      '/images/impact/hackathon-3.jpg',
    ],
    featured: false,
    published: true,
    order: 4,
  },
];

const Impact: React.FC = () => {
  const [initiatives, setInitiatives] = useState<ImpactInitiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchImpacts = async () => {
      try {
        const data = await getImpactInitiatives();
        if (!data || data.length === 0) {
          setInitiatives(FALLBACK_INITIATIVES);
          setUsingFallback(true);
        } else {
          setInitiatives(data);
          setUsingFallback(false);
        }
      } catch (err) {
        console.warn('Impact API failed — using fallback data:', err);
        setInitiatives(FALLBACK_INITIATIVES);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };
    fetchImpacts();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" style={{ color: '#994545' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading impact initiatives...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="section-title">Impact & Leadership</h2>
      <p className="lead mb-4">Community engagement, fellowships, and social initiatives</p>

      {usingFallback && (
        <Alert variant="info" className="mb-4">
          Showing offline content — live data currently unavailable.
        </Alert>
      )}

      <Row>
        {initiatives.map((initiative) => (
          <Col key={initiative.id} lg={6} className="mb-4">
            <Card className="card-custom h-100">
              {initiative.image && (
                <ImageWithFallback
                  src={initiative.image}
                  alt={initiative.title}
                  style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                />
              )}
              <Card.Body>
                {initiative.category && (
                  <Badge bg="secondary" className="mb-2">{initiative.category}</Badge>
                )}
                <h4 style={{ color: initiative.color || '#994545' }}>{initiative.title}</h4>
                {initiative.period && (
                  <p className="text-muted mb-3">{initiative.period}</p>
                )}
                <p>{initiative.description}</p>

                {/* achievements from DB or fallback */}
                {initiative.achievements && initiative.achievements.length > 0 && (
                  <ul>
                    {initiative.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                )}

                {/* stats from DB */}
                {initiative.stats && initiative.stats.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {initiative.stats.map((s, i) => (
                      <div key={i} className="text-center p-2 bg-light rounded">
                        <div style={{ color: '#994545', fontWeight: 'bold' }}>{s.value}</div>
                        <small className="text-muted">{s.label}</small>
                      </div>
                    ))}
                  </div>
                )}

                {/* tags from DB */}
                {initiative.tags && initiative.tags.length > 0 && (
                  <div className="d-flex flex-wrap gap-1 mt-2">
                    {initiative.tags.map(tag => (
                      <Badge key={tag} bg="light" text="dark" className="border">{tag}</Badge>
                    ))}
                  </div>
                )}

                {/* gallery from fallback or DB */}
                {initiative.gallery && initiative.gallery.length > 0 && (
                  <div className="mt-3">
                    <h6 style={{ color: initiative.color || '#994545', fontSize: '0.9rem' }}>Gallery:</h6>
                    <ImageGallery images={initiative.gallery} title={initiative.title} />
                  </div>
                )}

                {initiative.link && (
                  <div className="mt-3">
                    <a
                      href={initiative.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary-custom"
                    >
                      Learn More
                    </a>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Impact;