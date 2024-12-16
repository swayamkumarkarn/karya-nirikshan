// src/App.js
import React, { Suspense } from "react";
import { RouteManager } from "./RouteManager";
import Loader from "./components/Loader";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouteManager />
    </Suspense> 
  );
};

export default App;
