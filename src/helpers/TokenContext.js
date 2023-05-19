import React, { createContext, useState } from 'react';

// Create a new context for the token
export const TokenContext = createContext();

// Define the initial state for the token
const INITIAL_TOKEN_STATE = '';

// Create a provider component for the token context
export const TokenProvider = ({ children }) => {
  // Set up state to store the token value
  const [token, setToken] = useState(INITIAL_TOKEN_STATE);

  // Render the provider component and pass the token value and setter to the context
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
