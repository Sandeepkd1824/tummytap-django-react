import { createContext, useContext, useEffect, useState } from "react";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("Unknown User");
  const [userToken, setUserToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Read token and username from localStorage
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userName = localStorage.getItem("user_name");

    setIsAuthenticated(!!token);
    setUser(userName || "Unknown User");
    setUserToken(token);

    const handleStorageChange = (e) => {
      if (e.key === "access_token") {
        setIsAuthenticated(!!e.newValue);
      }
      if (e.key === "user_name") {
        setUser(e.newValue || "Unknown User");
      }
    };

    window.addEventListener("storage", handleStorageChange);
  }, []);

  // Login helper
  const login = (token, userName) => {
    setIsAuthenticated(true);
    setUser(userName);
    setUserToken(token);
  };

  // Logout helper
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem('refresh_token');
    localStorage.clear();

    setIsAuthenticated(false);
    setUser("Unknown User");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
