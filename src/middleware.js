import { useSelector } from "react-redux";

// Middleware logic moved into a hook
export const useMiddleware = (route) => {
const userData = useSelector((state) => state?.auth?.user);;

  const publicMiddleware = () => true; // Public routes are always accessible

  const protectedMiddleware = () => {
    if (userData) {
      return true;
    }
    window.location.href = "/login"; // Redirect if not authenticated
    return false;
  };

  const norProtectedMiddleware = () => {
    if (!userData) {
      return true;
    }
    window.location.href = "/"; 
    return false;
  };

  const adminMiddleware = () => {
    if (userData === "admin") {
      return true;
    }
    window.location.href = "/unauthorized"; // Redirect to unauthorized page
    return false;
  };

  // Middleware map for routes
  const middlewareMap = {
    "/": [protectedMiddleware],
    "/about": [protectedMiddleware, adminMiddleware], // About page requires auth and admin 
    "/analytics": [protectedMiddleware], // Analytics is protected
    "/documents": [protectedMiddleware], // Documents require auth
    "/login": [norProtectedMiddleware], // Login is public
    "/track-doc": [protectedMiddleware], // Track document requires auth
    "/track-doc/:id": [protectedMiddleware], // Track document requires auth
  };

  // Default middleware if a route isn't explicitly mapped
  const defaultMiddleware = [publicMiddleware];

  // Get middleware for the current route
  const middlewares = middlewareMap[route.path] || defaultMiddleware;

  // Apply all middlewares
  for (const middleware of middlewares) {
    if (!middleware(route)) {
      return false;
    }
  }

  return true;
};
