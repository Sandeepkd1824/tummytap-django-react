import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logo from "../img/tplogo.png"; // Adjust the path as necessary
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const colors = useTheme();
  const { cartItems } = useApp();
  const { isAuthenticated, user } = useAuth();

  console.log("hit cartItems", cartItems);

  const navStyle = {
    backgroundColor: colors.primary,
    color: colors.background,
    padding: "5px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
  };

  const linkStyle = {
    color: colors.background,
    marginRight: "1rem",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <nav style={navStyle}>
      {/* <div style={{ fontWeight: 'bold' }}>🍽️ TummyTap</div> */}
      <div>
        <img src={logo} alt="TummyTap Logo" style={{ height: "50px" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </>
        ) : (
          <div>
            <Link to="/profile" style={linkStyle}>
              {user}
            </Link>
          </div>
        )}

        <Link to="/cart" style={linkStyle}>
          Cart ({cartItems?.length || 0})
        </Link>
        <Link to="/checkout" style={linkStyle}>
          Checkout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
