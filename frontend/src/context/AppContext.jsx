import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext for user authentication

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const resetAllItemStates = () => {
    setProducts([]);
    setFavorites([]);
    setCartItems([]);
  };

  const { userToken: token } = useAuth(); // Assuming you have a way to get the token from context

  const headers = { Authorization: `Bearer ${token}` };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/products/products/",
        { headers }
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  // Fetch favorite items
  const fetchFavorites = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/products/favorites/",
        { headers }
      );
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load favorites");
    }
  };

  // Fetch all cart items
  const fetchCartItems = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/cart/", {
        headers,
      });
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart items");
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        products,
        setProducts,
        fetchProducts,
        favorites,
        setFavorites,
        fetchFavorites,
        fetchCartItems,
        resetAllItemStates
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
