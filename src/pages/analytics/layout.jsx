// src/pages/about/layout.jsx
import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h3>Layout Head</h3>
      </header>
      <main>{children}</main>
      <h3>Layout Footer</h3>
    </div>
  );
};

export default HomeLayout;
