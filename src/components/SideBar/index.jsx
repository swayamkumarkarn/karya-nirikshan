import React, { useEffect, useState } from "react";
import navigateToPage from "../../lib/functionality/navigation";
import { FaChartBar, FaFileAlt, FaShieldAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FiList } from "react-icons/fi";
import { CiPower } from "react-icons/ci";
import { useLocation } from "react-router-dom"; // Import useLocation

const menuItems = [
  { id: "Dashboard", label: "Dashboard", Icon: LuLayoutDashboard, route: "/" },
  {
    id: "Analytics",
    label: "Analytics",
    Icon: FaChartBar,
    route: "/analytics",
  },
  {
    id: "Track Doc",
    label: "Track Doc",
    Icon: IoLocationOutline,
    route: "/track-doc",
  },
  {
    id: "All Documents",
    label: "All Documents",
    Icon: FaFileAlt,
    route: "/documents",
  },
  {
    id: "Privacy Policy",
    label: "Privacy Policy",
    Icon: FaShieldAlt,
    route: "/privacy-policy",
  },
  {
    id: "Terms & Conditions",
    label: "Terms & Conditions",
    Icon: FaFileAlt,
    route: "/terms",
  },
];

const SideBar = () => {
  const [greet, setGreet] = useState("");
  const location = useLocation(); // Get the current route using useLocation

  useEffect(() => {
    function greetBasedOnTime() {
      const currentHour = new Date().getHours(); // Get the current hour (0-23)
      let greeting = "";

      if (currentHour >= 0 && currentHour < 12) {
        greeting = "Good Morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good Afternoon";
      } else {
        greeting = "Good Evening"; // You can add a "Good Evening" if you want to cover evening times
      }

      return greeting;
    }

    setGreet(greetBasedOnTime());
  }, []);

  // Set the active item based on the current path
  const activeItem =
    menuItems.find((item) => item.route === location.pathname)?.id ||
    "Dashboard";


  const getItemClasses = (item) =>
    `flex items-center gap-5 p-1 rounded-md cursor-pointer ${
      activeItem === item ? "font-bold text-black" : "text-gray-400"
    } hover:text-black`;

  return (
    <div className="text-gray-400 font-semibold w-[17%] h-screen flex flex-col justify-between">
      {/* Header */}
      <div className="p-5">
        <div className="mb-8 flex items-center gap-4 justify-center">
          <FiList className="text-4xl font-bolder" />
          <div>
            <h2 className="text-xl font-semibold text-black">Welcome,</h2>
            <p className="text-lg text-gray-500">{greet}</p>
          </div>
        </div>

        {/* Menu */}
        <h2 className="text-xl mb-5">Menu</h2>
        <div className="border-b-2 border-gray-200 mb-4 mx-5"></div>
        <ul className="space-y-3">
          {menuItems.map(({ id, label, Icon, route }) => (
            <li
              key={id}
              className={getItemClasses(id)}
              onClick={() => navigateToPage(route)}
            >
              <Icon className="text-2xl" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-5">
        <div
          className="flex items-center gap-5 p-1 rounded-md cursor-pointer hover:text-black"
          onClick={() => navigateToPage("/logout")} // Redirect to a logout route
        >
          <CiPower className="text-2xl font-bolder" />
          <span>Logout</span>
        </div>
        <div className="mt-8 text-sm text-center text-gray-400 flex gap-4 items-center">
          <img src="/bilaspur.svg" alt="bilaspur logo" />
          <div>
            <p>Created by</p>
            <p className="font-bold text-md text-black">BitCrackers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
