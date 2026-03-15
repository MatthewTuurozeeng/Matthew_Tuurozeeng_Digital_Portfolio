import type { Profile } from '../services/api';

const profileData: Profile = {
  name: 'Matthew Tuurozeeng',
  title: 'Software Engineer | Product Builder | Full-Stack Developer',
  bio: `I design software products that combine engineering rigor with user-centered design. 
I enjoy building platforms that empower communities, streamline workflows, and scale with modern cloud tooling.`,  
  profileImage: '/assets/images/profileImage/profile-photo.jpg',
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Express', 'PHP'],
    databases: ['MongoDB', 'PostgreSQL', 'MySQL'],
    tools: ['PlantUML', 'Trello', 'GitHub Actions', 'Figma'],
  },
  careerGoals:
    `Matthew Tuurozeeng is a Computer Science (BSc.) student at Ashesi University and a Mastercard Foundation Scholar, driven by a strong commitment to social impact and Africa's economic transformation. 
    Matthew loves building full-stack products that balance frontend polish with backend reliability.
    He currently co-found Sensorba LTD to pair software thinking with entrepreneurship and often prototypes web tools that streamline how small teams work.
    Matthew's interests span mentoring young learners, designing inclusive tech, and experimenting with data storytelling; away from the keyboard he sketches UI ideas, shoots street photography, and listens to TV talk shows to recharge.`,
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
      description: 'I invest in learning new languages, frameworks, and leadership practices.',
    },
  ],
};

export default profileData;