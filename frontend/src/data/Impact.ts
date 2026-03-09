import type { ImpactInitiative } from '../services/api';
// import { IMPACT_IMAGES } from '../constants/media';


const impactData: ImpactInitiative[] = [
  {
  id: 'impact-comput4all',
  title: 'Computing4All  - Digital Literacy',
  period: '2025  -  Present',
  color: '#994545',
  description: 'Teaching foundational computing skills to 50+ pupils in Nator.',
  category: 'education',
  achievements: ['Ran 12 weekend bootcamps', 'Donated 15 refurbished laptops'],
  stats: [{ label: 'Learners', value: '30+' }],
  tags: ['Education', 'Community'],
  image: '/assets/images/impactImages/impact1_1.jpeg',
  gallery: [
    '/assets/images/impactImages/impact2_2.jpeg',
    '/assets/images/impactImages/impact2_1.jpeg',
  ],
  link: '',
  featured: true,
  published: true,
  order: 1,
},
  
  {
    id: 'impact-fyby',
    title: 'For Youth By Youth (FYBY) Movement',
    period: '2025  -  Present',
    color: '#994545',
    description:
      'Member of the inaugural FYBY cohort, leading outreach and advocacy on consciour Leadership to empower young innovators across Africa.',
    category: 'community',
    achievements: [
    "Social media consultant and content creation volunteer for FYBY and Panhari's digital platforms",
      'Coordinated recruitment outreach for Cohort 2 (2026)',
      'Mentored youth-led ventures on civic innovation',
    ],
    stats: [
      { label: 'Youth Reached', value: '200+' },
      { label: 'Workshops', value: '12' },
    ],
    tags: ['Youth Leadership', 'Community', 'Innovation'],
    image: '/assets/images/impactImages/fyby_img.png',
    gallery: [
        '/assets/images/impactImages/day2_Onboarding_fyby.png',
      '/assets/images/impactImages/fyby1.png',
      '/assets/images/impactImages/fyby2.png',
    ],
    link: '',
    featured: true,
    published: true,
    order: 3,
  },
  {
    id: 'impact-bce-tutoring',
    title: 'Alma Mater Tutoring & BECE Prep',
    period: '2022  -  2023',
    color: '#994545',
    description:
      'Spent a full academic year tutoring junior high students at my alma mater, preparing two batches for the BECE exams.',
    category: 'education',
    achievements: [
      'Mentored 60+ students weekly across Math, Science, and ICT',
      'Designed revision timetables and mock exams',
      'Helped two cohorts improve BECE pass rates',
    ],
    stats: [
      { label: 'Students', value: '60+' },
      { label: 'Cohorts', value: '2' },
    ],
    tags: ['Education', 'Mentorship', 'Community'],
    image: '/assets/images/impactImages/impact1_2.jpeg',
    gallery: [
      '/assets/images/impactImages/impact1_3.jpeg',
      '/assets/images/impactImages/impact1_4.jpeg',
    ],
    link: '',
    featured: false,
    published: true,
    order: 2,
  },
];

export default impactData;