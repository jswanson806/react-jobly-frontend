// Import the necessary modules from React
import React, { createContext, useState } from 'react';

// Define the initial state for the user
const INITIAL_USER_STATE = {};

// Create a new context for the user
export const UserContext = createContext();

// Create a provider component for the user context
export const UserProvider = ({ children }) => {
  // Set up state to store the user object
  const [user, setUser] = useState(INITIAL_USER_STATE);

  // Render the provider component and pass the user object and setter to the context
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

