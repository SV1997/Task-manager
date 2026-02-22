// src/components/TaskForm.tsx
import { useState } from 'react';
import { MultiSelect } from './MultiSelect';
import { AUTHORS, DIVISIONS, STATUSES, PRIORITIES } from '../types';
import { taskAPI } from '../services/api';
import type { TaskFormData } from '../types';
import './TaskForm.css';

interface TaskFormProps {
  onSuccess?: () => void;
}

export const TaskForm = ({ onSuccess }: TaskFormProps) => {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [task, setTask] = useState('');
  const [dateOfTask, setDateOfTask] = useState('');
  const [status, setStatus] = useState<TaskFormData['status']>('pending');
  const [priority, setPriority] = useState<TaskFormData['priority']>('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (selectedAuthors.length === 0) {
      setError('Please select at least one author');
      return;
    }
    if (selectedDivisions.length === 0) {
      setError('Please select at least one division');
      return;
    }
    if (!task.trim()) {
      setError('Please enter a task description');
      return;
    }

    setLoading(true);

    try {
      // Submit task with authors and divisions joined by commas
      const taskData: TaskFormData = {
        author: selectedAuthors.join(', '),
        division: selectedDivisions.join(', '),
        task: task.trim(),
        dateOfTask,
        status,
        priority,
      };

      await taskAPI.createTask(taskData);
      
      setSuccess('Task created successfully!');
      
      // Reset form
      setSelectedAuthors([]);
      setSelectedDivisions([]);
      setTask('');
      setDateOfTask('');
      setStatus('pending');
      setPriority('medium');

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-header">
        <h2 className="task-form-title">Create New Task</h2>
        <p className="task-form-subtitle">Fill in the details below to create a new task</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="10" cy="13" r="1" fill="currentColor"/>
          </svg>
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {success}
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <MultiSelect
            options={AUTHORS}
            selected={selectedAuthors}
            onChange={setSelectedAuthors}
            placeholder="Select Resource(s)"
            label="Resource(s) *"
          />
        </div>

        <div className="form-group">
          <MultiSelect
            options={DIVISIONS}
            selected={selectedDivisions}
            onChange={setSelectedDivisions}
            placeholder="Select Division(s)"
            label="Division(s) *"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Task Description *</label>
        <textarea
          className="form-textarea"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task description..."
          rows={4}
          required
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Task Assigned On</label>
          <input
            type="date"
            className="form-input"
            value={dateOfTask}
            onChange={(e) => setDateOfTask(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskFormData['status'])}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskFormData['priority'])}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? (
          <>
            <div className="spinner" />
            Creating Task...
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Submit
          </>
        )}
      </button>
    </form>
  );
};
