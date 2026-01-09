import React from 'react';
import { Card } from 'react-bootstrap';

interface DashboardCardProps {
  title: string;
  count: number;
  icon: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, icon, color }) => {
  return (
    <Card className="mb-4 shadow-sm" style={{ borderTop: `4px solid ${color}` }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h2 className="mb-0" style={{ color }}>
              {count}
            </h2>
          </div>
          <div style={{ fontSize: '3rem' }}>{icon}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;