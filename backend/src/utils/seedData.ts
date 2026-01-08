const Project = require('../models/Project');
const Impact = require('../models/Impact');
const Profile = require('../models/Profile');
const connectDB = require('../config/database');
require('dotenv').config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Project.deleteMany({});
    await Impact.deleteMany({});
    await Profile.deleteMany({});

    // Create sample projects
    await Project.create([
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack web application with payment integration and real-time inventory management',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        image: 'https://via.placeholder.com/400x250/994545/FFFFFF?text=E-Commerce',
        githubUrl: 'https://github.com/yourusername/ecommerce',
        liveUrl: 'https://ecommerce-demo.com',
        featured: true,
        order: 1,
      },
      {
        title: 'Machine Learning Model',
        description: 'Predictive analytics system for business forecasting using neural networks',
        technologies: ['Python', 'TensorFlow', 'Flask', 'Pandas'],
        image: 'https://via.placeholder.com/400x250/9C484F/FFFFFF?text=ML+Model',
        githubUrl: 'https://github.com/yourusername/ml-model',
        featured: true,
        order: 2,
      },
      {
        title: 'Mobile Task Manager',
        description: 'Cross-platform productivity app with real-time sync and collaboration features',
        technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
        image: 'https://via.placeholder.com/400x250/997446/FFFFFF?text=Mobile+App',
        githubUrl: 'https://github.com/yourusername/task-manager',
        liveUrl: 'https://taskmanager-demo.com',
        order: 3,
      },
    ]);

    // Create sample impact initiatives
    await Impact.create([
      {
        title: 'Tech Community Leadership',
        period: '2023 - Present',
        color: '#994545',
        description: 'Leading a student tech community focused on mentoring aspiring developers and organizing workshops.',
        achievements: [
          'Organized 10+ technical workshops',
          'Mentored 50+ students',
          'Built collaborative learning programs',
        ],
        image: 'https://via.placeholder.com/400x250/994545/FFFFFF?text=Community',
        order: 1,
      },
      {
        title: 'Open Source Contributions',
        period: '2022 - Present',
        color: '#9C484F',
        description: 'Active contributor to open source projects, focusing on improving documentation and adding features.',
        achievements: [
          'Contributed to 15+ repositories',
          'Improved project documentation',
          'Collaborated with global developers',
        ],
        image: 'https://via.placeholder.com/400x250/9C484F/FFFFFF?text=Open+Source',
        order: 2,
      },
    ]);

    // Create sample profile
    await Profile.create({
      name: 'Your Name',
      title: 'Software Engineer & Problem Solver',
      bio: 'I am a dedicated Computer Science student with a passion for building innovative software solutions.',
      profileImage: 'https://via.placeholder.com/180/994545/FFFFFF?text=Profile',
      heroBackground: 'https://via.placeholder.com/1920x1080/994545/FFFFFF?text=Hero+Background',
      email: 'your.email@example.com',
      phone: '+1234567890',
      location: 'Your City, Country',
      skills: {
        frontend: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Bootstrap'],
        backend: ['Node.js', 'Python', 'Django', 'Express', 'REST APIs'],
        databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
        tools: ['Git', 'Docker', 'AWS', 'Linux', 'Agile'],
      },
      careerGoals: 'To join a forward-thinking organization where I can contribute to innovative projects.',
      principles: [
        {
          title: 'Quality First',
          description: 'Writing clean, maintainable code with comprehensive testing',
        },
        {
          title: 'Collaboration',
          description: 'Working effectively in teams and contributing to shared success',
        },
        {
          title: 'Continuous Growth',
          description: 'Always learning new technologies and improving existing skills',
        },
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/yourusername',
        github: 'https://github.com/yourusername',
        twitter: 'https://twitter.com/yourusername',
      },
    });

    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();