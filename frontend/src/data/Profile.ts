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
    `Matthew Tuurozeeng is a Computer Science (BSc.) student at Ashesi University and a Mastercard Foundation Scholar, driven by a strong commitment to social impact, civic engagement, and Africa’s economic transformation. He is the co-founder and CEO of Sensorba LTD, an agribusiness focused on producing high-quality tiger nuts while creating sustainable income opportunities for local communities. He believes strongly in using entrepreneurship as a tool for development.
    
    He is a Jeem Leech - Mastercard Foundation Fellow - Ghana Chapter for Entrepreneurship, where he is gaining hands-on training and mentorship to scale business operations sustainably. At the intersection of technology, governance, and development, He leverages his skills in data analysis, full-stack web development, and problem-solving to tackle real-world challenges. He has worked on multiple projects as a computer science student, building functional websites and software solutions from end to end.
    
    He is a Millennium Fellow (Class of 2025), where he collaborated with a diverse team on a social impact project and earned certification for the work. He also founded a community-based computer literacy program (Comput4All) aimed at equipping schoolchildren in his community with essential digital skills and bridging the gap between rural and urban access to technology. He is a member of the Inaugural Cohort of the For Youth By Youth (FYBY) Movement and currently serves as a Recruitment Outreach Volunteer for Cohort 2 (2026). Above all, He believes education is a catalyst for change.
    
    He previously spent 14 months tutoring and mentoring students at my junior high school alma mater, helping them transition into high school and aim higher. Always open to conversations around technology for good, youth leadership, civic innovation, and building solutions that matter.`,
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