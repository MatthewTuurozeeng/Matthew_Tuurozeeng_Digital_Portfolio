export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  summary: string;
  keyLearnings: string[];
  credentialUrl?: string;
  assetUrl?: string;
  assetType?: 'image' | 'pdf';
}

const certificates: Certificate[] = [
  {
  id: 'cert-react-typescript',
  title: 'React and TypeScript, v3',
  issuer: 'Frontend Masters',
  date: 'Mar 2026',
  summary:
    'Built strongly typed React applications using modern TypeScript patterns, hooks, and component architecture.',
  keyLearnings: [
    'Developed reusable and type-safe React components with TypeScript',
    'Worked with advanced React patterns, hooks, props typing, and state management',
    'Improved frontend code quality, scalability, and maintainability',
  ],
  assetUrl: '/documents/Matthew-Tuurozeeng-react-typescript-v3-cert.pdf',
  assetType: 'pdf',
},

  {
    id: 'cert-web-development',
    title: 'Complete Intro to Web Development, v3',
    issuer: 'Frontend Masters',
    date: 'Mar 2026',
    summary:
      'Learned the foundations of modern web development including HTML, CSS, JavaScript, and web application architecture.',
    keyLearnings: [
      'Built responsive and interactive web pages using HTML, CSS, and JavaScript',
      'Understood browser fundamentals and frontend development workflows',
      'Strengthened problem-solving and debugging skills for web applications',
    ],
      assetUrl: '/documents/Matthew-Tuurozeeng-web-dev-cert.pdf',
      assetType: 'pdf',
  },

  {
    id: 'cert-databases',
    title: 'Complete Intro to Databases',
    issuer: 'Frontend Masters',
    date: 'Mar 2026',
    summary:
      'Explored relational database concepts, SQL querying, schema design, and database-driven applications.',
    keyLearnings: [
      'Designed and queried relational databases using SQL',
      'Understood normalization, relationships, and database structures',
      'Connected databases to real-world application workflows',
    ],
      assetUrl: '/documents/Matthew_Tuurozeeng-databases-cert.pdf',
      assetType: 'pdf',
  },
  {
    id: 'cert-ml-ai',
    title: 'Machine Learning & AI Fundamentals',
    issuer: 'Future Interns',
    date: 'Aug 2025',
    summary: 'Applied supervised learning techniques to real-world forecasting and classification tasks.',
    keyLearnings: [
      'Built regression and classification models with 85%+ accuracy on sample datasets',
      'Translated model outputs into product-focused insights',
    ],
    assetUrl: '/documents/Matthew_Tuurozeeng_ML_Internship_cert.pdf',
    assetType: 'pdf',
  },

  {
  id: 'cert-bloomberg-finance',
  title: 'Bloomberg Finance Fundamentals',
  issuer: 'Bloomberg',
  date: 'Oct 2024',
  summary:
    'Completed foundational training in finance, financial markets, investing concepts, and business analysis.',
  keyLearnings: [
    'Learned key concepts in financial markets and investment fundamentals',
    'Understood business finance terminology and market operations',
    'Strengthened analytical and decision-making skills through finance-focused case studies',
  ],
    assetUrl: '/documents/Matthew-Tuurozeeng-Blomberg-Finance-Fundmentals-Cert.pdf',
    assetType: 'pdf',
},
  {
  id: 'cert-digital-economy',
  title: 'Digital Economy and Work',
  issuer:
    'Atingi Learning Platform',
  date: 'Sep 2024',
  summary:
    'Explored the evolving digital economy, future of work, digital skills, and opportunities enabled by technology-driven industries.',
  keyLearnings: [
    'Developed an understanding of digital transformation and the future workforce',
    'Learned about remote work, digital collaboration, and online professional skills',
    'Explored opportunities within the global digital economy and technology ecosystems',
  ],
    assetUrl: '/documents/Matthew-Tuurozeeng-Digital-Economy-and-Work-Cert.pdf',
    assetType: 'pdf',
},

];

export default certificates;
