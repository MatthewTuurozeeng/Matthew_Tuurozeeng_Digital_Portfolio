import type { Project } from '../services/api';

const projectsData: Project[] = [
  {
    id: 'proj-daakye',
    title: 'Daakye Vendor Space',
    description:
      'An inventory and sales management web application built for Ghanaian market vendors to manage stock, record sales, track orders, and view business analytics. Features real-time low-stock alerts that fire on every sale transaction, a full analytics dashboard surfacing top sellers and daily revenue summaries, and a layered RESTful backend across 8 route modules, 6 validators, and 5 services. Optimised for low-end phones and slow mobile connections serving informal market vendors across Ghana.',
    technologies: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'JWT', 'GitHub Actions', 'Vercel'],
    category: 'web',
    status: 'completed',
    image: '/assets/images/projectImages/Daakye_Vendor_Space.png',
    images: ['/assets/images/projectImages/Daakye_Vendor_Space.png'],
    screenshots: [],
    githubUrl: 'https://github.com/MatthewTuurozeeng/local-market-inventory-and-sales-mgt-system',
    liveUrl: 'https://local-market-inventory-and-sales-mg.vercel.app/',
    featured: true,
    published: true,
    order: 1,
  },

  {
    id: 'proj-portfolio',
    title: 'Personal Professional Platform',
    description:
      'A full-stack portfolio platform with custom admin dashboard, media uploads, and dynamic content management.',
    technologies: ['React', 'Vite', 'TypeScript', 'Node.js', 'MongoDB', 'Cloudinary', 'Vercel'],
    category: 'web',
    status: 'in-progress',
    image: '/assets/images/projectImages/Personal_Portfolio.png',
    images: ['/assets/images/projectImages/Personal_Portfolio.png'],
    screenshots: [],
    githubUrl: 'https://github.com/MatthewTuurozeeng/My_Portfolio_Website',
    liveUrl: '', // https://matthew-portfolio.dev
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: 'proj-school',
    title: 'School Website',
    description:
      'A modern, responsive web application for managing school admissions, enquiries, and information for Machris Christian Academy, Nadowli, Ghana. It provides essential information to parents, students, and the community Streamline the admission application process and enable efficient communication through an enquiry system Offer administrative tools for managing applications and content',
    technologies: [' React Next.js', 'Bootstrap', 'Node.js Express', 'MySQL database', 'Railway', 'Cloudinary', 'Vercel', 'Render'],
    category: 'web',
    status: 'completed',
    image: '/assets/images/projectImages/School_Website.png',
    images: ['/assets/images/projectImages/School_Website.png'],
    screenshots: [],
    githubUrl: 'https://github.com/MatthewTuurozeeng/Machris-website',
    liveUrl: 'https://machris-website.vercel.app',
    featured: true,
    published: true,
    order: 3,
  },
  {
    id: 'proj-fyby',
    title: 'For youth by Youth Website',
    description:
      ' A collaborative web platform empowering young people to connect, volunteer, and lead community-driven initiatives for positive social change. The platform creates an inclusive digital space where youth collaborate, share stories, and drive meaningful change',
    technologies: ['React TypeScript', 'Tailwind CSS', 'Node js Express','prisma', 'PHP', 'PostgreSQL', 'Cloudinary', 'Vercel', 'Render'],
    category: 'education',
    status: 'Completed',
    image: '/assets/images/projectImages/fyby.png',
    images: ['/assets/images/projectImages/fyby.png'],
    screenshots: [],
    githubUrl: 'https://github.com/MatthewTuurozeeng/for-youth-by-youth-platform',
    liveUrl: '',
    featured: false,
    published: true,
    order: 4,
  },

  {
    id: 'proj-course-management-system',
    title: 'Ashesi Course Management System',
    description:
      ' A web-based application designed to support course administration and attendance tracking for faculty and students. The platform allows faculty members to create and manage courses, and either accept or decline student requests to join their classes. Faculty can also create class sessions and generate unique attendance codes that students use to mark their attendance during each session. Students can browse available courses, request to join courses, see courses they are registered in,  and mark attendance using the generated codes. The system also allows students to track their personal attendance records, while faculty members can monitor and manage the attendance of students across all class sessions.',
    technologies: [' HTML' , 'CSS Bootstrap', 'JavaScript', 'PHP',  'MySQL', 'InfinityFree'],
    category: 'education',
    status: 'Completed',
    image: '/assets/images/projectImages/course_management.png',
    images: ['/assets/images/projectImages/course_management.png'],
    screenshots: [],
    githubUrl: 'https://github.com/MatthewTuurozeeng/ashesi-webtech-2025-peercoding-Matthew-Tuurozeeng/tree/main/Activity_04/Individual/course_management',
    liveUrl: '',
    featured: true,
    published: true,
    order: 5,
  },

  {
    id: 'proj-storytelling-wix',
    title: 'Digital Storytelling — “Social Media is Making People Unsocial”',
    description:
      'Created a multimedia storytelling site using Wix as the CMS. Produced an original CapCut video, scripted narrative copy, and integrated interactive sections to drive reflection on digital well-being. Published the site to collect peer feedback and measure engagement.',
    technologies: ['Wix CMS', 'CapCut', 'Canva', 'Content Strategy', 'Video Editing'],
    category: 'media',
    status: 'Completed',
    image: '/assets/images/projectImages/cms-site.png',
    images: ['/assets/images/projectImages/cms-site.png'],
    screenshots: [],
    githubUrl: '',
    liveUrl: 'https://tuurozeengmatthew.wixsite.com/agape-site',
    featured: false,
    published: true,
    order: 6,
  },
];

export default projectsData;