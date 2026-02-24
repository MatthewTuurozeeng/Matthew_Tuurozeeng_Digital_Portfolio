import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export interface Project {
  id: string;
  _id?: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  status?: string;
  image: string;           // primary image URL
  images?: string[];       // extra screenshots
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

const apiClient: AxiosInstance = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const api = {
  getProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
  },
  getProjectById: async (id: string): Promise<Project> => {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data;
  },
  submitContact: async (data: ContactFormData): Promise<ContactResponse> => {
    const response = await apiClient.post<ContactResponse>('/contact', data);
    return response.data;
  },
  getImpactInitiatives: async (): Promise<ImpactInitiative[]> => {
    const response = await apiClient.get<ImpactInitiative[]>('/impacts');
    return response.data;
  },
  getProfile: async (): Promise<Profile> => {
    const response = await apiClient.get<Profile>('/profile');
    return response.data;
  },
};

export const getUnreadContactsCount = async (): Promise<number> => {
  const res = await apiClient.get<{ count: number }>('/contacts/unread/count');
  return res.data.count;
};

export const getProjects = api.getProjects;
export const getProjectById = api.getProjectById;
export const submitContact = api.submitContact;
export const getImpactInitiatives = api.getImpactInitiatives;
export const getProfile = api.getProfile;

export default apiClient;
