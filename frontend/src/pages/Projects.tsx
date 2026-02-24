import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Badge, Button } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import { getProjects, Project } from '../services/api';

// hardcoded fallback — shown only when API is unreachable
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'fallback-1',
    title: 'Linear Algebra Learning Platform',
    description: 'A teaching tool for CS students taking Linear Algebra at Ashesi University.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    category: 'Web',
    image: '/images/fallback-project.png',
    images: [],
    githubUrl: 'https://github.com/MatthewTuurozeeng/for-youth-by-youth-platform',
    liveUrl: '',
    featured: true,
    published: true,
    order: 1,
  },
];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        if (!data || data.length === 0) {
          setProjects(FALLBACK_PROJECTS);
          setUsingFallback(true);
        } else {
          setProjects(data);
          setUsingFallback(false);
        }
        setError(null);
      } catch (err) {
        console.warn('Projects API failed — using fallback data:', err);
        setProjects(FALLBACK_PROJECTS);
        setUsingFallback(true);
        setError(null); // don't show error — fallback handles it silently
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" style={{ color: '#994545' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading projects...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="section-title">My Projects</h2>
      <p className="lead mb-4">A showcase of my technical work and creative solutions</p>

      {usingFallback && (
        <Alert variant="info" className="mb-4">
          Showing offline content — live data currently unavailable.
        </Alert>
      )}

      {/* Category filter */}
      <div className="d-flex gap-2 flex-wrap mb-4">
        {categories.map(cat => (
          <Button
            key={cat}
            size="sm"
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'btn-primary-custom' : ''}
            variant={filter === cat ? undefined : 'outline-secondary'}
          >
            {cat}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Alert variant="info">No projects available in this category.</Alert>
      ) : (
        <Row>
          {filtered.map((project) => (
            <Col key={project.id} lg={4} md={6} className="mb-4">
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Projects;