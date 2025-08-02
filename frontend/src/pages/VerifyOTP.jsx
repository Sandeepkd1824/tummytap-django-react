// src/pages/VerifyOtp.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const colors = useTheme();

  const email = state?.email || '';
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/accounts/verify-otp/', {
        email,
        otp
      });
      toast.success('Email verified! You can now log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid OTP.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{ color: colors.primary }}>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            disabled
            style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label>OTP:</label><br />
          <input
            type="text"
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: colors.primary,
            color: colors.background,
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
