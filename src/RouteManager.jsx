// src/RouteManager.js
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MetaTags from "./components/MetaTags";
import Loader from "./components/Loader";
import NotFound from "./components/NotFound";

// Fetch routes data from JSON files
function useFetchRoutes() {
  const [routes, setRoutes] = useState([]);
  const [routesFlat, setRoutesFlat] = useState([]);

  useEffect(() => {
    fetch("/routes.json")
      .then((response) => response.json())
      .then((data) => setRoutes(data))
      .catch((error) => console.error("Error fetching routes:", error));
  }, []);

  useEffect(() => {
    fetch("/routesFlat.json")
      .then((response) => response.json())
      .then((data) => setRoutesFlat(data))
      .catch((error) => console.error("Error fetching routes:", error));
  }, []);

  return { routes, routesFlat };
}

// Recursive function to find layouts for a path
function findLayoutsForPath(path, routes) {
  const layouts = [];

  function recursiveFind(currentPath, currentRoutes) {
    for (const route of currentRoutes) {
      const regex = new RegExp(`^${route.path.replace(/:\w+/g, "\\w+")}`);
      if (regex.test(currentPath)) {
        if (route.layout) {
          layouts.push(lazy(() => import(`${route.layout}`)));
        }

        if (route.children && route.children.length > 0) {
          recursiveFind(currentPath, route.children);
        }
        return;
      }
    }
  }

  recursiveFind(path, routes);
  return layouts;
}

const DynamicComponent = ({ route }) => {
  const Component = lazy(() => import(`${route.component}`));
  return (
    <Suspense fallback={<Loader />}>
      <MetaTags meta={route.meta} />
      <Component />
    </Suspense>
  );
};

const RouteWithLayouts = ({ route, routes }) => {
  const layouts = findLayoutsForPath(route.path, routes);

  return (
    <Suspense fallback={<Loader />}>
      {layouts.reduceRight(
        (children, Layout) => <Layout>{children}</Layout>,
        <DynamicComponent route={route} />
      )}
    </Suspense>
  );
};

const renderRoutes = (routesFlat, routes) =>
  routesFlat.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={<RouteWithLayouts route={route} routes={routes} />}
    />
  ));

export const RouteManager = () => {
  const { routes, routesFlat } = useFetchRoutes();

  if (routes.length === 0 || routesFlat.length === 0) {
    return <Loader />;
  }

  return (
    <Routes>
      {renderRoutes(routesFlat, routes)}
      <Route
        path="*"
        element={
          <>
            <NotFound />
          </>
        }
      />
    </Routes>
  );
};
