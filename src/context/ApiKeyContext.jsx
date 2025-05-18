import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiKeyContext = createContext();

export function ApiKeyProvider({ children }) {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('api_key') || '';
  });
  
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('api_key', apiKey);
    } else {
      localStorage.removeItem('api_key');
    }
  }, [apiKey]);

  const value = {
    apiKey,
    setApiKey,
  };

  return <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>;
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}
