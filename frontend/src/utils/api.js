// src/utils/address.js

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// 📦 Get all delivery addresses
export const fetchDeliveryAddresses = async () => {
  const response = await fetch(`${API_BASE_URL}/accounts/addresses/`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch addresses');
  }
  return await response.json();
};

// ➕ Add a new delivery address
export const createDeliveryAddress = async (addressData) => {
  const response = await fetch(`${API_BASE_URL}/accounts/addresses/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create address');
  }
  return await response.json();
};

// 🔄 Update an existing address
export const updateDeliveryAddress = async (id, addressData) => {
  const response = await fetch(`${API_BASE_URL}/accounts/addresses/${id}/`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update address');
  }
  return await response.json();
};

// 🗑️ Delete an address
export const deleteDeliveryAddress = async (id) => {
  const response = await fetch(`${API_BASE_URL}/accounts/addresses/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete address');
  }
  return true;
};
