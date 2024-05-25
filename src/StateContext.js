import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {

  const [user, setUser] = useState(localStorage.getItem('user') || "");
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [userUsername, setUserUsername] = useState(localStorage.getItem('userUsername') || "");
  const [showSubMenu, setShowSubMenu] = useState(false); 


  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);


  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (userUsername) {
      localStorage.setItem('userUsername', userUsername);
    } else {
      localStorage.removeItem('userUsername');
    }
  }, [userUsername]);

  return (
    <StateContext.Provider value={{ user, setUser, token, setToken, userUsername, setUserUsername, showSubMenu, setShowSubMenu }}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
