// src/pages/about/layout.jsx
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar/index";
import RightSidebar from '../components/RightSideBar/index'

const MainLayout = ({ children }) => {

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="bg-gray-100 flex">
        <SideBar />
        <RightSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="w-[83%] float-right">
          <div className=" flex flex-col h-screen">
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <main className={` border-blue-400 overflow-y-auto h-screen  ${isSidebarOpen ? "mr-[25%]" : "ml-0"
              } `}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
