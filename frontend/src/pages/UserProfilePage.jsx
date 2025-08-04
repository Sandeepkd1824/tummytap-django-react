// pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';

import DeliveryAddressList from '../components/user/DeliveryAddressList';
 const token = localStorage.getItem('access_token');
const ProfilePage = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userName = localStorage.getItem('user_name');

  const loadAddresses = async () => {
    try {
      const res = await axios.get(`/accounts/addresses/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error('Error fetching addresses', err);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        await axios.put(`/accounts/addresses/${formData.id}/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      } else {
        await axios.post('/accounts/addresses/', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      loadAddresses();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/accounts/addresses/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadAddresses();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_name');
    navigate('/login');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Your Profile</h1>
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            👤 {userName || 'User'}
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-md z-10 rounded px-4 py-2">
              <div
                onClick={handleLogout}
                className="cursor-pointer text-red-600 hover:underline"
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      <DeliveryAddressList
        addresses={addresses}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProfilePage;
