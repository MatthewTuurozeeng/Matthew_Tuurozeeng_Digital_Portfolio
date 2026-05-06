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
  variant?: 'Education' | 'Experience';
}

const Timeline: React.FC<TimelineProps> = ({ items, variant = 'education' }) => {
  return (
    <div className="relative border-l-2 border-[#994545]/30 pl-6 space-y-8">
      {items.map((item, idx) => (
        <div
          key={`${item.title}-${idx}`}
          className="relative bg-white rounded-xl shadow-sm border border-[#994545]/10 p-5 transition-all duration-300 ease-in-out hover:shadow-md animate-fadeIn"
        >
          <span className="absolute -left-[13px] top-6 h-5 w-5 rounded-full bg-[#994545] ring-4 ring-white" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h4 className="text-lg font-semibold text-[#994545]">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.subtitle}</p>
            </div>
            <span className="text-sm font-medium text-gray-500">{item.duration}</span>
          </div>

          <p className="mt-3 text-gray-700 leading-relaxed">{item.description}</p>

          {item.details?.length ? (
            <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
              {item.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          ) : null}

          {variant === 'experience' && (item.challenges?.length || item.achievements?.length) ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {item.challenges?.length ? (
                <div>
                  <h5 className="text-sm font-semibold text-gray-800">Challenges</h5>
                  <ul className="mt-1 list-disc pl-5 text-gray-700 space-y-1">
                    {item.challenges.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.achievements?.length ? (
                <div>
                  <h5 className="text-sm font-semibold text-gray-800">Achievements</h5>
                  <ul className="mt-1 list-disc pl-5 text-gray-700 space-y-1">
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
