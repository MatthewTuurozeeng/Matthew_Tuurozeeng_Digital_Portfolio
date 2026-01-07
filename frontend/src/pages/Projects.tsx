import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import { getProjects, Project } from '../services/api';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading projects...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <h2 className="section-title">My Projects</h2>
      <p className="lead mb-5">
        A showcase of my technical work and creative solutions
      </p>
      
      {projects.length === 0 ? (
        <Alert variant="info">
          No projects available at the moment.
        </Alert>
      ) : (
        <Row>
          {projects.map((project) => (
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