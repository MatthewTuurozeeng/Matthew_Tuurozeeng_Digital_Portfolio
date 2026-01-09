import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profile from '../models/Profile';
import Project from '../models/Project';
import Impact from '../models/Impact';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Impact.deleteMany({});
    console.log('Cleared existing data');

    // Create profile
    const profile = await Profile.create({
      fullName: 'Matthew Tuurozeeng',
      title: 'Computer Science Student & Aspiring Software Engineer',
      bio: 'Passionate about creating innovative solutions through technology.',
      email: 'your.email@example.com',
      phone: '+233 54 331 7402',
      location: 'Accra, Ghana',
      skills: [
        {
          category: 'Programming Languages',
          items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
        },
        {
          category: 'Frontend',
          items: ['React', 'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS'],
        },
        {
          category: 'Backend',
          items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
        },
      ],
      education: [
        {
          institution: 'Your University',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: new Date('2021-09-01'),
          current: true,
          description: 'Focusing on software engineering and AI',
        },
      ],
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/MatthewTuurozeeng' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/matthewtuurozeeng' },
        { platform: 'Facebook', url: 'https://web.facebook.com/tuurozeeng.matthew' },
      ],
      principles: [
        'Clean code is better than clever code',
        'User experience comes first',
        'Continuous learning is key',
      ],
      careerGoals: 'To become a full-stack software engineer building impactful solutions.',
    });
    console.log('Profile created');

    // Create sample projects
    await Project.create([
      {
        title: 'Portfolio Website',
        description: 'Professional portfolio with admin dashboard',
        technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
        category: 'web',
        status: 'in-progress',
        featured: true,
        liveUrl:    'https://Matthew.portfolio.com',
        githubUrl: 'https://github.com/MatthewTuurozeeng/My_Portfolio_Website',
       
        order: 1,
      },
      {
        title: 'Task Manager App',
        description: 'Full-stack task management application',
        technologies: ['React', 'Express', 'PostgreSQL'],
        category: 'web',
        status: 'completed',
        featured: true,
        liveUrl: 'https://taskmanager.example.com',
        githubUrl: 'https://github.com/yourusername/taskmanager',
        order: 2,
      },
    ]);
    console.log('Projects created');

    // Create sample impacts
    await Impact.create([
      {
        title: 'Student Tech Lead',
        organization: 'University Tech Club',
        type: 'leadership',
        description: 'Leading a team of student developers',
        role: 'President',
        startDate: new Date('2023-01-01'),
        current: true,
        achievements: [
          'Organized 5 hackathons',
          'Mentored 20+ students',
          'Increased club membership by 150%',
        ],
        skills: ['Leadership', 'Event Planning', 'Mentorship'],
        featured: true,
        order: 1,
      },
    ]);
    console.log('Impacts created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();