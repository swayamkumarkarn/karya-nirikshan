import React, { useEffect, useState } from "react";
import navigateToPage from "../../lib/functionality/navigation";
import { FaChartBar, FaFileAlt, FaShieldAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FiList } from "react-icons/fi";
import { CiPower } from "react-icons/ci";
import { useLocation } from "react-router-dom"; // Import useLocation

const menuItems = [
  { id: "Dashboard", label: "डैशबोर्ड", Icon: LuLayoutDashboard, route: "/" },
  {
    id: "Analytics",
    label: "विश्लेषण",
    Icon: FaChartBar,
    route: "/analytics",
  },
  {
    id: "Track Doc",
    label: "दस्तावेज़ ट्रैक करें",
    Icon: IoLocationOutline,
    route: "/track-doc",
  },
  {
    id: "All Documents",
    label: "सभी दस्तावेज़",
    Icon: FaFileAlt,
    route: "/documents",
  },
  {
    id: "Privacy Policy",
    label: "गोपनीयता नीति",
    Icon: FaShieldAlt,
    route: "/privacy-policy",
  },
  {
    id: "Terms & Conditions",
    label: "नियम एवं शर्तें",
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
        greeting = "सुप्रभात"; // Good Morning in Hindi
      } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "शुभ अपराह्न"; // Good Afternoon in Hindi
      } else {
        greeting = "शुभ संध्या"; // Good Evening in Hindi
      }

      return greeting;
    }

    setGreet(greetBasedOnTime());
  }, []);

  // Set the active item based on the current path
  const activeItem =
    menuItems.find((item) => item.route === location.pathname)?.id || "";

  const getItemClasses = (item) =>
    `flex items-center gap-3 p-2 rounded-md cursor-pointer ${
      activeItem === item
        ? "font-bold text-black border border-r-4 border-black bg-white shadow-md" // Left border and padding for active item
        : "text-gray-400"
    } hover:text-black`;

  return (
    <div className="text-gray-400 font-semibold w-[17%] h-screen flex flex-col justify-between">
      {/* Header */}
      <div className="p-4">
        <div className="mb-8 flex items-center gap-4 justify-center">
          <FiList className="text-4xl font-bolder" />
          <div>
            <h2 className="text-xl font-semibold text-black">स्वागत है,</h2>
            <p className="text-lg text-gray-500 ml-4">{greet} 🙏</p>
          </div>
        </div>

        {/* Menu */}
        <h2 className="text-xl mb-5">मेनू</h2>
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
          <span>लॉगआउट</span>
        </div>
        <div className="mt-8 text-sm text-center text-gray-400 flex gap-4 items-center">
          <img src="/bilaspur.svg" alt="bilaspur logo" />
          <div>
            <p>द्वारा निर्मित</p>
            <p className="font-bold text-md text-black">BitCrackers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
