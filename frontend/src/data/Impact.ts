import type { ImpactInitiative } from '../services/api';
import { IMPACT_IMAGES } from '../constants/media';

const impactData: ImpactInitiative[] = [
  {
    id: 'impact-community',
    title: 'Tech Community Leadership',
    period: '2023 – Present',
    color: '#994545',
    description:
      'Leading a student tech community focused on mentorship, hackathons, and engineering workshops.',
    category: 'community',
    achievements: [
      'Mentored 50+ students',
      'Hosted 10 technical workshops',
      'Grew community to 300+ members',
    ],
    stats: [
      { label: 'Workshops', value: '10+' },
      { label: 'Members', value: '300+' },
    ],
    tags: ['Leadership', 'Education', 'Community'],
    image: IMPACT_IMAGES.techCommunity,
    gallery: [
      '/images/impact/workshop-1.jpg',
      '/images/impact/workshop-2.jpg',
      '/images/impact/workshop-3.jpg',
    ],
    link: '',
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 'impact-open-source',
    title: 'Open Source Contributions',
    period: '2022 – Present',
    color: '#9C484F',
    description:
      'Contributing to documentation, accessibility fixes, and developer tooling across multiple OSS projects.',
    category: 'tech',
    achievements: [
      'Contributed to 15 repositories',
      'Improved accessibility on 4 projects',
      'Authored 20+ pull requests',
    ],
    stats: [{ label: 'Repos', value: '15+' }],
    tags: ['Open Source', 'Accessibility'],
    image: IMPACT_IMAGES.openSource,
    gallery: [],
    link: '',
    featured: false,
    published: true,
    order: 2,
  },
  {
    id: 'impact-fellowship',
    title: 'Educational Fellowship',
    period: '2023',
    color: '#997446',
    description:
      'Selected for a fellowship focused on using technology to expand access to STEM education in underserved regions.',
    category: 'education',
    achievements: [
      'Designed curriculum for 3 partner schools',
      'Trained 25 educators on ed-tech tools',
      'Built prototype learning modules',
    ],
    stats: [
      { label: 'Schools', value: '3' },
      { label: 'Educators', value: '25' },
    ],
    tags: ['Education', 'EdTech'],
    image: IMPACT_IMAGES.fellowship,
    gallery: ['/images/impact/fellowship-1.jpg', '/images/impact/fellowship-2.jpg'],
    link: '',
    featured: false,
    published: true,
    order: 3,
  },
];

export default impactData;