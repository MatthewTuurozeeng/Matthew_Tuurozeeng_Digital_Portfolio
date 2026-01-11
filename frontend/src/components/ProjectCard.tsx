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
  // Ensure image URL is valid
  const imageUrl = project.image && project.image.trim() !== '' 
    ? project.image 
    : 'https://via.placeholder.com/400x250/994545/FFFFFF?text=No+Image';

  // Filter out empty screenshots
  const validScreenshots = project.screenshots?.filter(
    (screenshot) => screenshot && screenshot.trim() !== ''
  ) || [];

  // Check if demo video is valid
  const hasValidDemoVideo = project.demoVideo && 
    project.demoVideo.trim() !== '' && 
    (project.demoVideo.startsWith('http://') || project.demoVideo.startsWith('https://'));

  return (
    <Card className="card-custom">
      {/* Featured Badge */}
      {project.featured && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
          <Badge bg="warning" text="dark">⭐ Featured</Badge>
        </div>
      )}

      {/* Main Image */}
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <ImageWithFallback
          src={imageUrl}
          alt={project.title}
          style={{ height: '200px', objectFit: 'cover', width: '100%' }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ color: '#994545' }}>{project.title}</Card.Title>

        <Card.Text className="flex-grow-1">
          {project.description}
        </Card.Text>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-3">
            {project.technologies.map((tech, index) => (
              <span
                key={`${project.id || project.id}-${tech}-${index}`}
                className="skill-badge"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Screenshots */}
        {validScreenshots.length > 0 && (
          <div className="mb-3">
            <h6 style={{ color: '#994545', fontSize: '0.9rem' }}>
              Screenshots:
            </h6>
            <ImageGallery
              images={validScreenshots}
              title={project.title}
            />
          </div>
        )}

        {/* Demo Video */}
        {hasValidDemoVideo && (
          <div className="mb-3">
            <h6 style={{ color: '#994545', fontSize: '0.9rem' }}>
              Demo Video:
            </h6>
            <VideoPlayer
              videoUrl={project.demoVideo!}
              thumbnail={imageUrl}
              title={`${project.title} Demo`}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-auto">
          {project.githubUrl && project.githubUrl.trim() !== '' && (
            <Button
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-custom"
              size="sm"
            >
              <i className="bi bi-github"></i> GitHub
            </Button>
          )}

          {project.liveUrl && project.liveUrl.trim() !== '' && (
            <Button
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-custom"
              size="sm"
            >
              🌐 Live Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;