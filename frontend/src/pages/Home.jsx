import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

const Home = () => {
  const colors = useTheme();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        toast.error('Access token missing. Please log in.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:8000/api/products/products/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: colors.primary }}>Welcome to TummyTap</h2>
      <p style={{ color: colors.text }}>Explore our delicious menu and order now!</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
