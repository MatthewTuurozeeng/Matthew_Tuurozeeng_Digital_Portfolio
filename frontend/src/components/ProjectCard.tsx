import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Project } from '../services/api';
import ImageWithFallback from './ImageWithFallback';
import VideoPlayer from './VideoPlayer';
import ImageGallery from './ImageGallery';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="card-custom">
      {project.featured && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
          <Badge bg="warning" text="dark">Featured</Badge>
        </div>
      )}

      <ImageWithFallback
        src={project.image}
        alt={project.title}
        style={{ height: '200px', objectFit: 'cover', width: '100%' }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{project.title}</Card.Title>
        <Card.Text className="flex-grow-1">{project.description}</Card.Text>
        
        <div className="mb-3">
          {project.technologies.map((tech) => (
            <span key={tech} className="skill-badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Screenshots Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-3">
            <h6 style={{ color: '#994545', fontSize: '0.9rem' }}>Screenshots:</h6>
            <ImageGallery images={project.screenshots} title={project.title} />
          </div>
        )}

        {/* Demo Video */}
        {project.demoVideo && (
          <div className="mb-3">
            <h6 style={{ color: '#994545', fontSize: '0.9rem' }}>Demo Video:</h6>
            <VideoPlayer
              videoUrl={project.demoVideo}
              thumbnail={project.image}
              title={`${project.title} Demo`}
            />
          </div>
        )}
        
        <div className="d-flex gap-2 mt-auto">
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