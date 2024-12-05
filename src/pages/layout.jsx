// src/pages/about/layout.jsx
import React from "react";
import Header from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <header>
        {/* <h3>Main Layout Head</h3> */}
        <Header/>
      </header>
      <main>{children}</main>
      {/* <h3>Main Layout Footer</h3> */}
    </div>
  );
};

export default MainLayout;
