import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MetaTags from "./components/MetaTags";
import NotFound from "./components/NotFound";
import Loader from "./components/Loader";

const App = () => {
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

  if (routes.length === 0 || routesFlat.length === 0) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // Recursive function to find layouts for a path
  function findLayoutsForPath(path, routes) {
    const layouts = [];

    function recursiveFind(currentPath, currentRoutes) {
      for (const route of currentRoutes) {
        // Check if the route path matches or is a parameterized route
        const regex = new RegExp(`^${route.path.replace(/:\w+/g, "\\w+")}`);
        if (regex.test(currentPath)) {
          // Add the current layout if it exists
          if (route.layout) {
            layouts.push(lazy(() => import(`${route.layout}`)));
          }

          // Recursively check children routes if they exist
          if (route.children && route.children.length > 0) {
            recursiveFind(currentPath, route.children);
          }

          // If we found a match, we can return early
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
      <Suspense
        fallback={
          <>
            <Loader />
          </>
        }
      >
        <MetaTags meta={route.meta} />
        <Component />
      </Suspense>
    );
  };

  const RouteWithLayouts = ({ route }) => {
    // console.log("inside RouteWithLayouts \t ",route.path,"\t and \t", routes);
    const layouts = findLayoutsForPath(route.path, routes);

    console.log("inside RouteWithLayouts \t ", layouts);
    return (
      <Suspense
        fallback={
          <>
            <Loader />
          </>
        }
      >
        {layouts.reduceRight(
          (children, Layout) => (
            <Layout>{children}</Layout>
          ),
          <DynamicComponent route={route} />
        )}
      </Suspense>
    );
  };

  const renderRoutes = (routesFlat) =>
    routesFlat.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={<RouteWithLayouts route={route} />}
      />
    ));

  return (
    <Suspense fallback={<div>Loading app...</div>}>
      <Routes>
        {renderRoutes(routesFlat)}
        <Route
          path="*"
          element={
            <>
              <NotFound />
            </>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
