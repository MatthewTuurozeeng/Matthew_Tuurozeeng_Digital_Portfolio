import React from 'react';

export interface TimelineItem {
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  details?: string[];
  challenges?: string[];
  achievements?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: 'education' | 'experience';
}

const Timeline: React.FC<TimelineProps> = ({ items, variant = 'education' }) => {
  return (
    <div className="timeline-wrapper space-y-8">
      {items.map((item, idx) => (
        <div key={`${item.title}-${idx}`} className="timeline-card animate-fadeIn">
          <span className="timeline-dot" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="timeline-meta">
              <h4 className="timeline-title">{item.title}</h4>
              <p className="timeline-subtitle">{item.subtitle}</p>
            </div>
            <span className="timeline-duration">{item.duration}</span>
          </div>

          <p className="timeline-body">{item.description}</p>

          {item.details?.length ? (
            <ul className="timeline-list list-disc space-y-1">
              {item.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          ) : null}

          {variant === 'experience' && (item.challenges?.length || item.achievements?.length) ? (
            <div className="timeline-grid">
              {item.challenges?.length ? (
                <div>
                  <h5>Challenges</h5>
                  <ul className="timeline-list list-disc space-y-1">
                    {item.challenges.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.achievements?.length ? (
                <div>
                  <h5>Achievements</h5>
                  <ul className="timeline-list list-disc space-y-1">
                    {item.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Timeline;