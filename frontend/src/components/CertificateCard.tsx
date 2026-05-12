import React from 'react';
import type { Certificate } from '../data/certificates';

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div className="certificate-card animate-fadeIn">
      {certificate.assetUrl && certificate.assetType === 'image' ? (
        <a
          className="certificate-media"
          href={certificate.assetUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={certificate.assetUrl} alt={`${certificate.title} certificate`} />
        </a>
      ) : null}
      <div className="certificate-header">
        <div>
          <h4>{certificate.title}</h4>
          <p className="certificate-issuer">{certificate.issuer}</p>
        </div>
        <span className="certificate-date">{certificate.date}</span>
      </div>
      <p className="certificate-summary">{certificate.summary}</p>
      <ul className="certificate-list">
        {certificate.keyLearnings.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {certificate.assetUrl && certificate.assetType === 'pdf' ? (
        <a
          className="certificate-link"
          href={certificate.assetUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View certificate
        </a>
      ) : null}
      {certificate.credentialUrl ? (
        <a
          className="certificate-link"
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View credential
        </a>
      ) : null}
    </div>
  );
};

export default CertificateCard;
