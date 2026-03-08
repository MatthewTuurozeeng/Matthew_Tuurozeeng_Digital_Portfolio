import projectsData from '../data/Projects';
import impactData from '../data/Impact';
import profileData from '../data/Profile';

export interface Project {
  id: string;
  _id?: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  status?: string;
  image: string;
  images?: string[];
  screenshots?: string[];
  demoVideo?: string;
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ImpactInitiative {
  id: string;
  _id?: string;
  title: string;
  period?: string;
  color?: string;
  description: string;
  category: string;
  achievements?: string[];
  stats?: { label: string; value: string }[];
  tags?: string[];
  image?: string;
  gallery?: string[];
  link?: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  skills: {
    frontend: string[];
    backend: string[];
    databases: string[];
    tools: string[];
  };
  careerGoals: string;
  principles: Array<{ title: string; description: string }>;
}

const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data));
const simulateDelay = <T>(data: T, delay = 250) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(clone(data)), delay));

export const api = {
  getProjects: async (): Promise<Project[]> => simulateDelay(projectsData),
  getProjectById: async (id: string): Promise<Project> => {
    const project = projectsData.find((p) => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return simulateDelay(project);
  },
  submitContact: async (_data: ContactFormData): Promise<ContactResponse> => {
    console.info('Contact form submission (static mode):', _data);
    return simulateDelay({
      success: true,
      message: 'Message sent successfully (demo mode).',
    });
  },
  getImpactInitiatives: async (): Promise<ImpactInitiative[]> => simulateDelay(impactData),
  getProfile: async (): Promise<Profile> => simulateDelay(profileData),
};

export const getProjects = api.getProjects;
export const getProjectById = api.getProjectById;
export const submitContact = api.submitContact;
export const getImpactInitiatives = api.getImpactInitiatives;
export const getProfile = api.getProfile;

export default api;