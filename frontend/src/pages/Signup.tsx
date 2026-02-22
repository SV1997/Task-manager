// src/pages/Signup.tsx
import { useState } from 'react';
import { authAPI } from '../services/api';
import './Auth.css';
import {useNavigate} from 'react-router-dom';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignupSuccess = (token: string, userData: any) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("token", token);
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!/\d/.test(password)) {
      setError('Password must contain at least one number');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.signup(name, email, password);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        handleSignupSuccess(response.token, response.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-circle auth-circle-1"></div>
        <div className="auth-circle auth-circle-2"></div>
        <div className="auth-circle auth-circle-3"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="8" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="3"/>
                <path d="M16 24L22 30L32 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Sign up to get started</p>
          </div>

          {error && (
            <div className="auth-alert auth-alert-error">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="10" cy="13" r="1" fill="currentColor"/>
              </svg>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 18C4 14.6863 6.68629 12 10 12C13.3137 12 16 14.6863 16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 6L10 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="5" y="9" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 9V6C7 4.34315 8.34315 3 10 3C11.6569 3 13 4.34315 13 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 10C3 10 6 5 10 5C14 5 17 10 17 10C17 10 14 15 10 15C6 15 3 10 3 10Z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 3L17 17M8.5 8.5C8.18 8.82 8 9.26 8 9.75C8 10.99 9.01 12 10.25 12C10.74 12 11.18 11.82 11.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M6.5 6.5C5 7.5 3 9.5 3 10C3 10 6 15 10 15C10.9 15 11.7 14.7 12.5 14.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M13.5 13.5C14.5 12.7 17 10.5 17 10C17 10 14 5 10 5C9.5 5 9 5.1 8.5 5.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              </div>
              <p className="form-hint">Must be at least 6 characters with a number</p>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="5" y="9" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 9V6C7 4.34315 8.34315 3 10 3C11.6569 3 13 4.34315 13 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 10C3 10 6 5 10 5C14 5 17 10 17 10C17 10 14 15 10 15C6 15 3 10 3 10Z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 3L17 17M8.5 8.5C8.18 8.82 8 9.26 8 9.75C8 10.99 9.01 12 10.25 12C10.74 12 11.18 11.82 11.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M6.5 6.5C5 7.5 3 9.5 3 10C3 10 6 15 10 15C10.9 15 11.7 14.7 12.5 14.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M13.5 13.5C14.5 12.7 17 10.5 17 10C17 10 14 5 10 5C9.5 5 9 5.1 8.5 5.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? (
                <>
                  <div className="button-spinner" />
                  Creating account...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="auth-link">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
