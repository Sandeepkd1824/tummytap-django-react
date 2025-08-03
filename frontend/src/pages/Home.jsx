import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

const Home = () => {
  const colors = useTheme();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const token = localStorage.getItem('access_token');
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/products/products/', { headers });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load products');
    }
  };

  // Fetch favorite items
  const fetchFavorites = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/products/favorites/', { headers });
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load favorites');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFavorites();
  }, []);

  const displayedProducts = showFavoritesOnly
    ? products.filter((p) => favorites.some((f) => f.product === p.id))
    : products;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: colors.primary }}>Welcome to TummyTap</h2>
      <p style={{ color: colors.text }}>Explore our delicious menu and order now!</p>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button
          onClick={() => setShowFavoritesOnly(false)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: !showFavoritesOnly ? colors.primary : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          All Items
        </button>
        <button
          onClick={() => setShowFavoritesOnly(true)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: showFavoritesOnly ? colors.primary : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          My Favorites
        </button>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favorites={favorites}
              refreshFavorites={fetchFavorites}
            />
          ))
        ) : (
          <p>No products to display.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
