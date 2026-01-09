import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Type definitions
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  // New media fields
  screenshots?: string[];
  demoVideo?: string;
  featured?: boolean;
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

export interface ImpactInitiative {
  id: number;
  title: string;
  period: string;
  color: string;
  description: string;
  achievements: string[];
  // New media fields
  image?: string;
  gallery?: string[];
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
  principles: Array<{
    title: string;
    description: string;
  }>;
}

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
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

// API Service Methods
export const api = {
  getProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
  },
  
  getProjectById: async (id: number): Promise<Project> => {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data;
  },
  
  submitContact: async (data: ContactFormData): Promise<ContactResponse> => {
    const response = await apiClient.post<ContactResponse>('/contact', data);
    return response.data;
  },
  
  getImpactInitiatives: async (): Promise<ImpactInitiative[]> => {
    const response = await apiClient.get<ImpactInitiative[]>('/impact');
    return response.data;
  },
  
  getProfile: async (): Promise<Profile> => {
    const response = await apiClient.get<Profile>('/profile');
    return response.data;
  },
};

// Named exports
export const getProjects = api.getProjects;
export const getProjectById = api.getProjectById;
export const submitContact = api.submitContact;
export const getImpactInitiatives = api.getImpactInitiatives;
export const getProfile = api.getProfile;

export default apiClient;