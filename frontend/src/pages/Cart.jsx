import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const colors = useTheme();
  const { cartCount, setCartCount } = useCart();
  const token = localStorage.getItem('access_token');
  const [cartItems, setCartItems] = useState([]);

  const API = 'http://localhost:8000/api/products';

  const { updateCartItems } = useCart();

    const fetchCart = async () => {
    try {
        const res = await axios.get(`${API}/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data);
        updateCartItems(res.data);  // Update global context
    } catch (err) {
        toast.error('Failed to load cart');
    }
    };


  const modifyQuantity = async (productId, action) => {
    const url = `${API}/cart/${productId}/${action}/`;
    try {
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // refresh after update
    } catch (err) {
      toast.error(`Failed to ${action} quantity`);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`${API}/cart/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API}/cart/clear/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      toast.error('Failed to clear cart');
    }
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: colors.primary }}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart yet.</p>
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

          <div
            style={{
              marginTop: '2rem',
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          >
            Total: ₹{getTotal().toFixed(2)}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={clearCart}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'red',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
