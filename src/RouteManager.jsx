// src/RouteManager.js
import React, { Suspense, lazy, useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import NotFound from "./components/NotFound";
import MetaTags from "./components/MetaTags";
import { applyMiddleware } from "./middleware";

const useFetchRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [routesFlat, setRoutesFlat] = useState([]);

  useLayoutEffect(() => {
    fetch("/routes.json")
      .then((response) => response.json())
      .then((data) => setRoutes(data))
      .catch((error) => console.error("Error fetching routes:", error));
  }, []);

  useLayoutEffect(() => {
    fetch("/routesFlat.json")
      .then((response) => response.json())
      .then((data) => setRoutesFlat(data))
      .catch((error) => console.error("Error fetching routes:", error));
  }, []);

  return { routes, routesFlat };
};

const findLayoutsForPath = (path, routes) => {
  const layouts = [];

  const recursiveFind = (currentPath, currentRoutes) => {
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
  };

  recursiveFind(path, routes);
  return layouts;
};

const DynamicComponent = ({ route }) => {
  const Component = lazy(() => import(`${route.component}`));

  if (!applyMiddleware(route)) {
    return null;
  }

  return (
    <Suspense fallback={<Loader />}>
      <MetaTags meta={route.meta} />
      <Component />
    </Suspense>
  );
};

const RouteWithLayouts = ({ route, routes }) => {
  const layouts = findLayoutsForPath(route.path, routes);

  if (!applyMiddleware(route)) {
    return null;
  }

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
