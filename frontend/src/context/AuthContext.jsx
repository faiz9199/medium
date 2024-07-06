import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for token in localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      fetchUser(token); // Fetch the logged-in user's information
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      setLoggedIn(true);
      fetchUser(token); // Fetch the logged-in user's information
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        {
          name,
          email,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      setLoggedIn(true);
      fetchUser(token); // Fetch the logged-in user's information
    } catch (error) {
      console.error("Register failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
  };

  const fetchUser = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
