// StateContext.js
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  return (
    <StateContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
