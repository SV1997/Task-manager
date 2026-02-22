// src/components/TaskList.tsx
import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../services/api';
import type { Task } from '../types';
import './TaskList.css';

interface TaskListProps {
  refresh?: number;
  onCountChange?: (count: number) => void; // should be TOTAL entries
}

type GetTasksResponse = {
  tasks: Task[];
  totalPages: number;

  // ✅ add ONE of these from backend for total entries
  totalCount?: number;
  totalTasks?: number;
};

const LIMIT = 10;

export const TaskList = ({ refresh, onCountChange }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // optional: when refresh changes (new task), go back to page 1
  useEffect(() => {
    setPage(1);
  }, [refresh]);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      const response: any = await taskAPI.getAllTasks({
        page,
        limit: LIMIT,
      });

      setTasks(response.tasks);
      setTotalPages(response.totalPages);
      setError('');

      // ✅ send TOTAL count to header button
      const total =
        response.totalCount ??
        response.totalTasks ??
        response.tasks.length; // fallback only if backend doesn't provide total

      onCountChange?.(total);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      onCountChange?.(0);
    } finally {
      setLoading(false);
    }
  }, [page, onCountChange]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const getStatusColor = (status: Task['status']) => {
    const colors = {
      pending: 'status-pending',
      'in-progress': 'status-progress',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: 'priority-low',
      medium: 'priority-medium',
      high: 'priority-high',
      urgent: 'priority-urgent',
    };
    return colors[priority];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="task-list-loading">
        <div className="loading-spinner" />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-error">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
          <path d="M24 16V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="32" r="2" fill="currentColor" />
        </svg>
        <p>{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="12" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="M24 28H40M24 36H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h3>No tasks yet</h3>
        <p>Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2 className="task-list-title">All Tasks</h2>

        {/* this is PAGE count; keep it if you want */}
        <p className="task-list-count">{tasks.length} tasks (this page)</p>
      </div>

      <div className="tasks-grid">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-card-header">
              <div className="task-badges">
                <span className={`badge ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </span>
                <span className={`badge ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <span className="task-date">{formatDate(task.dateOfTask)}</span>
            </div>

            <div className="task-card-body">
              <p className="task-description">{task.task}</p>

              <div className="task-meta">
                <div className="task-meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M2 14C2 11.2386 4.68629 9 8 9C11.3137 9 14 11.2386 14 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{task.author}</span>
                </div>

                <div className="task-meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 2V4M11 2V4M2 6H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span>{task.division}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>

          <button
            className="pagination-button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
