import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import MetaTags from "./components/MetaTags";

const App = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Fetch the routes dynamically from the routes.json file
    fetch("/routes.json")
      .then((response) => response.json())
      .then((data) => setRoutes(data));
  }, []);

  if (routes.length === 0) {
    return <div>Loading...</div>;
  }

  // Recursive function to render the routes dynamically
  const renderRoute = (route) => {
    const Component = React.lazy(() => import(`${route.component}`));
    const LayoutComponent = route.layout
      ? React.lazy(() => import(`${route.layout}`))
      : null;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <RouteWithLayout
            LayoutComponent={LayoutComponent}
            Component={Component}
            meta={route.meta}
            routePath={route.path} // Pass the current route's path to RouteWithLayout
            hasChildren={!!route.children} // Pass whether the route has children
          />
        }
      >
        {/* Recursively render child routes */}
        {route.children?.map(renderRoute)}
      </Route>
    );
  };

  return (
    <Routes>
      {/* Dynamically render all routes */}
      {routes.map(renderRoute)}

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

// A custom wrapper component to manage layout and conditional rendering
const RouteWithLayout = ({
  LayoutComponent,
  Component,
  meta,
  routePath,
  hasChildren,
}) => {
  const location = useLocation();

  // Dynamically determine if the current path matches the route's path
  const isExactMatch = location.pathname === routePath;

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {LayoutComponent ? (
        <LayoutComponent>
          <MetaTags meta={meta} />
          {/* Render the main component only if the current path matches the route's path */}
          {isExactMatch && <Component />}
          {/* Render the Outlet only if the route has children */}
          {hasChildren && <Outlet />}
        </LayoutComponent>
      ) : (
        <>
          <MetaTags meta={meta} />
          <Component />
        </>
      )}
    </React.Suspense>
  );
};

export default App;
