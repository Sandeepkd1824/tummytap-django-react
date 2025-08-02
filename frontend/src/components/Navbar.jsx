import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const colors = useTheme();
  const { cartItems } = useCart();

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

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold' }}>🍽️ TummyTap</div>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/cart" style={linkStyle}>
          Cart ({cartItems?.length || 0})
        </Link>
        <Link to="/checkout" style={linkStyle}>Checkout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
