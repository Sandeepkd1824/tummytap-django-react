import React, { useState, useEffect } from "react";
// import axios from 'axios';
import { useTheme } from "../context/ThemeContext";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext for user authentication

// import { toast } from 'react-toastify';

const Home = () => {
  const colors = useTheme();
  const {
    products,
    favorites,
    cartItems,
    fetchFavorites,
    fetchProducts,
    fetchCartItems,
  } = useApp();

  // const [favorites, setFavorites] = useState([]);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { userToken: token } = useAuth(); // Assuming you have a way to get the token from context

  useEffect(() => {
    if (token) {
      console.log("Fetching data with token:", token);
      if (!products.length) {
        fetchProducts();
      }
      if (!favorites.length) {
        fetchFavorites();
      }
      if (!cartItems.length) {
        fetchCartItems();
      }
    }
  }, [token]);

  const displayedProducts = showFavoritesOnly
    ? products.filter((p) => favorites.some((f) => f.product === p.id))
    : products;

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: colors.primary }}>Welcome to TummyTap</h2>
      <p style={{ color: colors.text }}>
        Explore our delicious menu and order now!
      </p>

      {/* Filter Buttons */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        <button
          onClick={() => setShowFavoritesOnly(false)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: !showFavoritesOnly ? colors.primary : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          All Items
        </button>
        <button
          onClick={() => setShowFavoritesOnly(true)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: showFavoritesOnly ? colors.primary : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          My Favorites
        </button>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
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
