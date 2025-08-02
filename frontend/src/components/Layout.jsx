import React from 'react';
import Navbar from './Navbar';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const colors = useTheme();

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Navbar />
      <main style={{ padding: '1.5rem' }}>{children}</main>
    </div>
  );
};

export default Layout;
