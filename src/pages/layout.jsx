import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar/index";
import RightSidebar from "../components/RightSideBar/index";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Define exact paths
  const exactPathsWithoutLayout = ["/login"];

  // Define paths to match with "startsWith"
  const startsWithPathsWithoutLayout = ["/open-track-doc"];

  // Determine layout visibility
  const isLayoutVisible =
    !exactPathsWithoutLayout.includes(location.pathname) &&
    !startsWithPathsWithoutLayout.some((route) =>
      location.pathname.startsWith(route)
    );

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
              <main className={`overflow-y-auto h-screen`}>{children}</main>
            </div>
          </div>
        </div>
      )}

      {!isLayoutVisible && <main>{children}</main>}
    </>
  );
};

export default MainLayout;
