import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Projects
export const adminProjectsApi = {
  getAll: () => axios.get(`${API_URL}/projects`),
  getById: (id: string) => axios.get(`${API_URL}/projects/${id}`),
  create: (data: any) =>
    axios.post(`${API_URL}/projects`, data, { headers: getAuthHeader() }),
  update: (id: string, data: any) =>
    axios.put(`${API_URL}/projects/${id}`, data, { headers: getAuthHeader() }),
  delete: (id: string) =>
    axios.delete(`${API_URL}/projects/${id}`, { headers: getAuthHeader() }),
};

// Impact
export const adminImpactApi = {
  getAll: () => axios.get(`${API_URL}/impact`),
  getById: (id: string) => axios.get(`${API_URL}/impact/${id}`),
  create: (data: any) =>
    axios.post(`${API_URL}/impact`, data, { headers: getAuthHeader() }),
  update: (id: string, data: any) =>
    axios.put(`${API_URL}/impact/${id}`, data, { headers: getAuthHeader() }),
  delete: (id: string) =>
    axios.delete(`${API_URL}/impact/${id}`, { headers: getAuthHeader() }),
};

// Profile
export const adminProfileApi = {
  get: () => axios.get(`${API_URL}/profile`),
  upsert: (data: any) =>
    axios.post(`${API_URL}/profile`, data, { headers: getAuthHeader() }),
};

// Contacts
export const adminContactApi = {
  getAll: () => axios.get(`${API_URL}/contact`, { headers: getAuthHeader() }),
  updateStatus: (id: string, status: string) =>
    axios.put(`${API_URL}/contact/${id}`, { status }, { headers: getAuthHeader() }),
  delete: (id: string) =>
    axios.delete(`${API_URL}/contact/${id}`, { headers: getAuthHeader() }),
};

// Upload
export const uploadApi = {
  single: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_URL}/upload/single`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  multiple: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return axios.post(`${API_URL}/upload/multiple`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (publicId: string) =>
    axios.delete(`${API_URL}/upload/${publicId}`, { headers: getAuthHeader() }),
};