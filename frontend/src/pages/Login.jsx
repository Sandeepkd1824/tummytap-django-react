// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const colors = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
        email,
        password,
      });

      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user_id', res.data.user.id);
      console.log(res.data, 'Login response');
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || 'Login failed.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
      backgroundColor: colors.background,
      padding: '2rem 1rem',
    }}>
      <div style={{
        background: '#fff',
        padding: '1.75rem',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px',
        boxSizing: 'border-box',
        marginTop: '4rem',
      }}>
        <h2 style={{
          marginBottom: '1.25rem',
          color: colors.primary,
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '1.5rem'
        }}>
          Login to TummyTap
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
            boxSizing: 'border-box',
            marginTop: '0.5rem'
          }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
