// context/UserContext.js
"use client";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState(null); // State to hold the task data

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      localStorage.removeItem("user");
    } finally {
      setLoading(false); // Finished loading user data
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        {/* Loading spinner with Taskblaze text */}
        <div className="spinner-container">
          <div className="spinner-text">Taskblaze</div>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ work,setWork,user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
