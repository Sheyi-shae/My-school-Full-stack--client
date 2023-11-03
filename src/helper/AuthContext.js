// AuthContext.js

import React, { createContext, useState, useContext,useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    // Restore the authentication state from localStorage, or set it to false if not found
    const storedAccessToken = localStorage.getItem('accessToken');
    return !!storedAccessToken;
  });
  useEffect(() => {
    // This effect runs only once on component mount
    // It reads from local storage and sets the state
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAuthState(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
