import React, { useState } from 'react';
import { Modal, Carousel } from 'react-bootstrap';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClose = () => setShowModal(false);
  const handleShow = (index: number) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="image-gallery">
        <div className="row g-2">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`col-${images.length === 1 ? '12' : '6'}`}
              onClick={() => handleShow(index)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                <img
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                  }}
                  className="gallery-image"
                />
                {index === 3 && images.length > 4 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    +{images.length - 4}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel activeIndex={activeIndex} onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>

      <style>{`
        .gallery-image:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};

export default ImageGallery;