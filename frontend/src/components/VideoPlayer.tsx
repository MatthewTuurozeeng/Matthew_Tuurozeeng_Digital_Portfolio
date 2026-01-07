import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, thumbnail, title }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <div
        style={{
          position: 'relative',
          cursor: 'pointer',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        onClick={handleShow}
      >
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
          }}
          className="play-button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            style={{ marginLeft: '4px' }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video
            controls
            autoPlay
            style={{ width: '100%', borderRadius: '8px' }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VideoPlayer;