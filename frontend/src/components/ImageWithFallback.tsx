import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = 'https://via.placeholder.com/400x250/994545/FFFFFF?text=Image+Not+Found',
  alt,
  className = '',
  style = {},
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    console.log('Image failed to load:', imgSrc);
    setHasError(true);
    setIsLoading(false);
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    console.log('Image loaded successfully:', imgSrc);
    setIsLoading(false);
    setHasError(false);
  };

  // If src is empty or invalid, use fallback immediately
  React.useEffect(() => {
    if (!src || src.trim() === '') {
      setImgSrc(fallbackSrc);
      setIsLoading(false);
    } else {
      setImgSrc(src);
      setIsLoading(true);
    }
  }, [src, fallbackSrc]);

  return (
    <div style={{ position: 'relative', ...style }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div className="spinner-border text-primary" role="status" style={{ color: '#994545' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...style,
        }}
      />
    </div>
  );
};

export default ImageWithFallback;