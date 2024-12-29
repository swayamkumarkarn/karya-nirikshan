// src/contexts/RefreshContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const RefreshContext = createContext();

// Custom hook to use the context
export const useRefresh = () => useContext(RefreshContext);

// Provider component to wrap the app
export const RefreshProvider = ({ children }) => {
  const [refreshData, setRefreshData] = useState(false);

  const triggerRefresh = () => setRefreshData(true);

  const resetRefresh = () => setRefreshData(false);

  return (
    <RefreshContext.Provider value={{ refreshData, triggerRefresh, resetRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
