import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const Register = () => {
  const colors = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/accounts/register/', {
        email,
        password,
      });
      toast.success('OTP sent to your email!');
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed.');
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
          Register for TummyTap
        </h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            display: 'block',
            width: '100%',
            backgroundColor: colors.primary,
            color: colors.background,
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxSizing: 'border-box',
          }}
        >
          Register
        </button>
      </form>
      </div>
    </div>
  );
};

export default Register;
