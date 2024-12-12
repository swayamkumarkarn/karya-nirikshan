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
        <div className="bg-gray-100 flex relative">
          <SideBar />

          {/* Right Sidebar */}
          <RightSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          <div className="flex-1">
            <div className="flex flex-col h-screen">
              <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              />
              <main
                className={`overflow-y-auto h-screen`}
              >
                {children}
              </main>
            </div>
          </div>
        </div>
      )}

      {!isLayoutVisible && (
        <main>
          {children}
        </main>
      )}
    </>
  );
};

export default MainLayout;
