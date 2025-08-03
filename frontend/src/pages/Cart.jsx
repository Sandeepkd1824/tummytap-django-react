import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const colors = useTheme();
  const { updateCartItems } = useCart();
  const token = localStorage.getItem('access_token');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const API = 'http://localhost:8000/api/products';

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
      updateCartItems(res.data);
    } catch (err) {
      toast.error('Failed to load cart', err);
    }
  };

  const modifyQuantity = async (productId, action) => {
    try {
      await axios.post(`${API}/cart/${productId}/${action}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch {
      toast.error(`Failed to ${action} quantity`);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`${API}/cart/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    const confirmClear = window.confirm('Are you sure you want to clear the entire cart?');
    if (!confirmClear) return;

    try {
      await axios.delete(`${API}/cart/clear/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch {
      toast.error('Failed to clear cart');
    }
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: colors.primary }}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '5rem', color: '#777' }}>
          <ShoppingCart size={64} />
          <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>Your cart is empty.</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                borderBottom: '1px solid #eee',
                paddingBottom: '1rem',
              }}
            >
              <img
                src={item.product_image || 'https://via.placeholder.com/60'}
                alt={item.product_name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  marginRight: '1rem',
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.25rem' }}>{item.product_name}</h4>
                <p style={{ margin: 0 }}>₹{item.product_price}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button onClick={() => modifyQuantity(item.product, 'decrease')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => modifyQuantity(item.product, 'increase')}>+</button>
              </div>

              <button
                onClick={() => removeItem(item.product)}
                style={{
                  marginLeft: '1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                title="Remove Item"
              >
                <Trash2 size={20} color="red" />
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div
            style={{
              marginTop: '2rem',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              textAlign: 'right',
            }}
          >
            Total: ₹{getTotal().toFixed(2)}
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              onClick={clearCart}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'red',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
