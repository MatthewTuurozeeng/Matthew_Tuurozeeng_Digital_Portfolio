import type { Profile } from '../services/api';

const profileData: Profile = {
  name: 'Matthew Tuurozeeng',
  title: 'Software Engineer & Product Builder',
  bio: `I design and ship software products that combine engineering rigor with user-centered design. 
I enjoy building platforms that empower communities, streamline workflows, and scale with modern cloud tooling.`,
  profileImage: '/assets/images/profileImage/profile-photo.jpg',
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'GraphQL'],
    databases: ['MongoDB', 'PostgreSQL', 'Supabase'],
    tools: ['AWS', 'Docker', 'GitHub Actions', 'Figma'],
  },
  careerGoals:
    'Build resilient software platforms for education, climate, and financial inclusion across Africa.',
  principles: [
    {
      title: 'People-first Engineering',
      description: 'I build with empathy, translating user challenges into thoughtful technical solutions.',
    },
    {
      title: 'Craft + Scalability',
      description: 'I treat design details with as much care as system reliability and performance.',
    },
    {
      title: 'Continuously Learning',
      description: 'I invest in learning new languages, frameworks, and leadership practices every quarter.',
    },
  ],
};

export default profileData;