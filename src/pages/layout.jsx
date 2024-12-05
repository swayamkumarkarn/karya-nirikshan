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
          <div className=" flex flex-col h-screen">
            <Header />
            <main className=" border-blue-400 overflow-y-auto h-screen">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
