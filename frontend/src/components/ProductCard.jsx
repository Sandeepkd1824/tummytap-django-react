import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductCard = ({ product, favorites, refreshFavorites }) => {
  const colors = useTheme();
  const token = localStorage.getItem('access_token');
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    const fav = favorites?.find((f) => f.product === product.id);
    setIsFavorite(!!fav);
    setFavoriteId(fav?.id || null);
  }, [product, favorites]);

  const addToCart = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/products/cart/',
        {
          product: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart');
    }
  };

  const toggleFavorite = async () => {
    try {
      if (!isFavorite) {
        await axios.post(
          'http://localhost:8000/api/products/favorites/',
          { product: product.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(`${product.name} added to favorites`);
      } else if (favoriteId) {
        await axios.delete(
          `http://localhost:8000/api/products/favorites/${favoriteId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.info(`${product.name} removed from favorites`);
      }
      await refreshFavorites(); // Update parent favorite list
    } catch (err) {
      console.error(err);
      toast.error('Failed to update favorite');
    }
  };

  return (
    <div
      style={{
        border: `1px solid ${colors.primary}`,
        borderRadius: '10px',
        padding: '1rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={product.main_image || 'https://via.placeholder.com/250'}
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />

      <h3 style={{ margin: '0.5rem 0', color: colors.primary }}>{product.name}</h3>
      <p style={{ color: colors.text }}>{product.description}</p>
      <p style={{ fontWeight: 'bold' }}>₹{product.price}</p>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={addToCart}
          style={{
            flex: 1,
            padding: '0.5rem',
            backgroundColor: colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={toggleFavorite}
          style={{
            flex: 1,
            padding: '0.5rem',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1.2rem',
            color: isFavorite ? 'red' : 'black',
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
