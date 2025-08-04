import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import logo from '../img/tplogo.png'; // Adjust the path as necessary
const Navbar = () => {
  const colors = useTheme();
  const { cartItems } = useCart();
  
  const token = localStorage.getItem('access_token'); // adjust if using a different key
  const userName = localStorage.getItem('user_name'); // set this during login
  const isAuthenticated = !!token;



  const navStyle = {
    backgroundColor: colors.primary,
    color: colors.background,
    padding: '5px',
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
      {/* <div style={{ fontWeight: 'bold' }}>🍽️ TummyTap</div> */}
      <div>
        <img src={logo} alt="TummyTap Logo" style={{ height: '50px' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Home</Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        ) : (
          <div>
            <Link to="/profile" style={linkStyle}>{userName || 'User'}</Link>
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
