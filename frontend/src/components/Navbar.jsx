import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const colors = useTheme();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem('access'); // adjust if using a different key
  const userName = localStorage.getItem('userName'); // set this during login
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const navStyle = {
    backgroundColor: colors.primary,
    color: colors.background,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  };

  const linkStyle = {
    color: colors.background,
    marginRight: '1rem',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    marginRight: '1rem',
  };

  const dropdownMenuStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #ccc',
    padding: '0.5rem',
    minWidth: '100px',
    zIndex: 10,
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold' }}>🍽️ TummyTap</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Home</Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        ) : (
          <div style={dropdownStyle} onClick={() => setDropdownOpen(!dropdownOpen)}>
            👤 {userName || 'User'}
            {dropdownOpen && (
              <div style={dropdownMenuStyle}>
                <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Logout
                </div>
              </div>
            )}
          </div>
        )}

        <Link to="/cart" style={linkStyle}>
          Cart ({cartItems?.length || 0})
        </Link>
        <Link to="/checkout" style={linkStyle}>Checkout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
