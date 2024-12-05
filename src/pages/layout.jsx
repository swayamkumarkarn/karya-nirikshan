// src/pages/about/layout.jsx
import React from "react";
import Header from "../components/Header";

import SideBar from "../components/SideBar/index";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="bg-gray-100 flex">
        <SideBar />
        <div className="w-[83%] float-right">
          <Header />
          <main className="border-4 border-blue-400">{children}</main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
