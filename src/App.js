import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// MetaTags component to dynamically update <title> and <meta> description
const MetaTags = ({ meta }) => {
  useEffect(() => {
    if (meta) {
      // Set the page title
      document.title = meta.title || "Default Title";

      // Handle the meta description tag
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", meta.description || "Default description");
      } else {
        // If no meta description exists, create one
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.setAttribute("name", "description");
        newMetaDescription.setAttribute("content", meta.description || "Default description");
        document.head.appendChild(newMetaDescription);
      }

      // You can extend this to other meta tags (og:title, og:description, etc.)
    }
  }, [meta]);

  return null;  // No need to render anything
};

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

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Component = React.lazy(() => import(`${route.component}`));

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  {/* Set the meta tags for each page */}
                  <MetaTags meta={route.meta} />
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Component />
                  </React.Suspense>
                </>
              }
            />
          );
        })}
        {/* Handle 404 route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
