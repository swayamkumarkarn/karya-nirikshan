// src/App.js
import React, { Suspense } from "react";
import { RouteManager } from "./RouteManager";
import Loader from "./components/Loader";
import { RefreshProvider } from "./contexts/RefreshContext"; // Import RefreshProvider

const App = () => {
  return (
    <RefreshProvider>
      <Suspense fallback={<Loader />}>
        <RouteManager />
      </Suspense>
    </RefreshProvider>
  );
};

export default App;
