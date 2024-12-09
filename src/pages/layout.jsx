import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar/index";
import RightSidebar from "../components/RightSideBar/index";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const routesWithoutLayout = ["/login"]; // Add more routes if needed

  const isLayoutVisible = !routesWithoutLayout.includes(location.pathname);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isLayoutVisible && (
        <div className="bg-gray-100 flex">
          <SideBar />

          <RightSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={"w-[83%] float-right"}>
            <div className="flex flex-col h-screen">
              <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              />
              <main
                className={`border-blue-400 border-4 overflow-y-auto h-screen ${
                  isSidebarOpen ? "mr-[25%]" : "ml-0"
                }`}
              >
                {children}
              </main>
            </div>
          </div>
        </div>
      )}

      {!isLayoutVisible && (
        <main
          className={`
          }`}
        >
          {children}
        </main>
      )}
    </>
  );
};

export default MainLayout;
