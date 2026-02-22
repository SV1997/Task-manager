// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface Task {
  _id: string;
  author: string;
  division: string;
  task: string;
  dateOfTask: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  author: string;
  division: string;
  task: string;
  dateOfTask: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'awaiting further instructions';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface TasksResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  tasks: Task[];
}

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  awaitingFurtherInstructions: number;
  byDivision: Array<{ _id: string; count: number }>;
  byPriority: Array<{ _id: string; count: number }>;
}

export const AUTHORS = [
  'Aditya Prakash Rao',
  'Shreya Ramakrishnan',
  'Preksha Dugar',
  'Shaashwat Jindal',
  'Vaibhav Sharma',
  'Aditya Pandey'
] as const;

export const DIVISIONS = [
  'MVL',
  'Road Safety',
  'Transport',
  'Other'
] as const;

export const STATUSES = [
  'pending',
  'in-progress',
  'completed',
  'awaiting further instructions'
] as const;

export const PRIORITIES = [
  'low',
  'medium',
  'high',
  'urgent'
] as const;
