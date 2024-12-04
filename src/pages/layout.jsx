// src/pages/about/layout.jsx
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h3>Main Layout Head</h3>
      </header>
      <main>{children}</main>
      <h3>Main Layout Footer</h3>
    </div>
  );
};

export default MainLayout;
