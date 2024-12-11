// src/middleware.js

// Example authentication and role-based logic
const isAuthenticated = () => localStorage.getItem("authToken") !== null;
const isAdmin = () => localStorage.getItem("userRole") === "admin";

// Middleware functions
const publicMiddleware = () => true; // Public routes are always accessible
const protectedMiddleware = () => {
  if (isAuthenticated()) {
    return true;
  }
  window.location.href = "/login";
  return false;
};
const adminMiddleware = () => {
  if (isAuthenticated() && isAdmin()) {
    return true;
  }
  window.location.href = "/unauthorized"; // Redirect to unauthorized page
  return false;
};

// Middleware map for routes
const middlewareMap = {
//   "/": [publicMiddleware],
//   "/about": [protectedMiddleware], 
//   "/analytics": [protectedMiddleware, adminMiddleware], 
//   "/documents": [protectedMiddleware], 
//   "/login": [publicMiddleware],
//   "/track-doc": [protectedMiddleware], 
};

// Default middleware if a route isn't explicitly mapped
const defaultMiddleware = [publicMiddleware];

// Helper to apply middleware
export const applyMiddleware = (route) => {
  const middlewares = middlewareMap[route.path] || defaultMiddleware;

  for (const middleware of middlewares) {
    if (!middleware(route)) {
      // If any middleware fails, access is denied
      return false;
    }
  }

  // If all middlewares pass, access is granted
  return true;
};
