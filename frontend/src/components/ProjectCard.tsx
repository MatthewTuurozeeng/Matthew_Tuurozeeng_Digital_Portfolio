import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Project } from '../services/api';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="card-custom">
      <Card.Img 
        variant="top" 
        src={project.image} 
        alt={project.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{project.title}</Card.Title>
        <Card.Text className="flex-grow-1">{project.description}</Card.Text>
        
        <div className="mb-3">
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="skill-badge">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="d-flex gap-2">
          {project.githubUrl && (
            <Button 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary-custom" 
              size="sm"
            >
              GitHub
            </Button>
          )}
          {project.liveUrl && (
            <Button 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary-custom" 
              size="sm"
            >
              Live Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;