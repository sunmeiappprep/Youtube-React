import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // Initialize state with localStorage values if they exist
  const [user, setUser] = useState(localStorage.getItem('user') || "");
  const [token, setToken] = useState(localStorage.getItem('token') || "");

  // Effect to persist user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Effect to persist token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <StateContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
