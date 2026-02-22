// src/services/api.ts
import axios from 'axios';
import type { AuthResponse, TaskFormData, TasksResponse, TaskStats } from '../types';
// import { useNavigate } from 'react-router-dom';
const resStatus = [200,201]
const API_BASE_URL = 'https://separate-sibyl-selfprojectvaibhav-1ea40343.koyeb.app/';
// const navigate = useNavigate();
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
function rediretUnauthorized(){
    window.location.replace("/login")
}
// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (response) => {
        try {
            if (resStatus.includes(response.status)) {
                return response.data;
            } else {
                console.error("Unexpected response status:", response);
                return Promise.reject(new Error("Unexpected response status"));
            }
        } catch (error) {
            console.error("Error in response interceptor:", error);
        }
        return {
            success: false,
            message: "NetworkOps: Something went wrong intercepting the response",
        }
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error?.response.status);
            
            if((error?.response?.status===401||error?.response.status===403)){
                // console.log(error.response);
                rediretUnauthorized()
            }
            console.error("Response error:", error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request error:", error.request);
            return Promise.reject(new Error("No response received from server"));
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error in request setup:", error.message);
            return Promise.reject(new Error(error.message));
        }
    }
);

// Auth API
export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await api.post<AuthResponse>('/api/auth/signup', {
      name,
      email,
      password,
    });
    return response;
  },
    verifyToken: async()=>{
    const response = await api.get<{ success: boolean; stats: TaskStats }>('/api/auth/verify');
    return response.data;

  },
  isLogin: async ()=>{
    const res = await api.get('/api/auth/isLogin')
    console.log(res);
    
    if(res.data.success!==true){
      // navigate('/login')
      window.location.replace("/login")
    }
  },
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/api/auth/login', {
      email,
      password,
    });
    console.log(response);
    
    return response;
  },

  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Task API
export const taskAPI = {
  createTask: async (taskData: TaskFormData) => {
    const response = await api.post('/api/tasks', taskData);
    return response.data;
  },

  getAllTasks: async (params?: {
    author?: string;
    division?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get<TasksResponse>('/api/tasks', { params });
    return response;
  },

  getTaskById: async (id: string) => {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data;
  },

  updateTask: async (id: string, taskData: Partial<TaskFormData>) => {
    const response = await api.put(`/api/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get<{ success: boolean; stats: TaskStats }>('/api/tasks/stats');
    return response.data;
  },



  downloadExcel: async () => {
  const token = localStorage.getItem('token');

  // ✅ Use fetch directly — bypasses axios interceptor that corrupts blobs
  const response = await fetch('https://separate-sibyl-selfprojectvaibhav-1ea40343.koyeb.app/api/tasks/download/excel', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to download');

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `tasks_${new Date().toISOString().split('T')[0]}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
},
};

export default api;
