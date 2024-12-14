import React, { useEffect, useState } from "react";
import navigateToPage from "../../lib/functionality/navigation";
import { FaChartBar, FaFileAlt, FaShieldAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FiList } from "react-icons/fi";
import { CiPower } from "react-icons/ci";
import { useLocation } from "react-router-dom"; // Import useLocation
import { logout } from "../../services/authService";
import { logoutAction } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route using useLocation

  const handleLogout=async()=>{
    try {
      await logout();
      dispatch(logoutAction());
      navigateToPage("/login");
    } catch (err) {
      console.error("Login failed:", err);
    }
    
  }


  useEffect(() => {
    function greetBasedOnTime() {
      const currentHour = new Date().getHours(); // Get the current hour (0-23)
      let greeting = "";

      if (currentHour >= 0 && currentHour < 12) {
        greeting = "Good Morning"; // Good Morning in Hindi सुप्रभात
      } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good Afternoon"; // Good Afternoon in Hindi शुभ अपराह्न
      } else {
        greeting = "Good Evening"; // Good Evening in Hindi शुभ संध्या
      }

      return greeting;
    }

    setGreet(greetBasedOnTime());
  }, []);

  // Set the active item based on the current path
  const activeItem =
    menuItems.find((item) => item.route === location.pathname)?.id || "";

  const getItemClasses = (item) =>
    `flex  text-base items-center gap-3 p-2 px-4 rounded-md cursor-pointer  transition-all duration-200 ${
      activeItem === item
        ? " text-black ml-4 border-gray-400 bg-white shadow-md " // Left border and padding for active item
        : "text-gray-400"
    } hover:text-black hover:ml-4 hover:border-gray-400 hover:bg-white hover:shadow-md `;

  return (
    <div className="text-gray-400 font-semibold w-[17%] h-screen flex flex-col justify-between  ">
      {/* Header */}
      <div className="p-4 relative">
        <div className="mb-8 flex items-start gap-4 justify-center absolute">
          <FiList className="text-4xl font-bolder" />
          <div>
            <h2 className="text-xl font-semibold text-black">Welcome,</h2>
            <p className="text-lg text-gray-500 ml-4">  
              {greet}
            </p>
          </div>
        </div>

        <div className="mb-20"></div>

        {/* Menu */}
        <h2 className="text-lg mb-2 ml-2">मेनू</h2>
        <div className="border-b-2 border-gray-200 mb-2 mx-5 "></div>
        <ul className="space-y-2 text-md">
          {menuItems.map(({ id, label, Icon, route }) => (
            <li
              key={id}
              className={getItemClasses(id)}
              onClick={() => navigateToPage(route)}
            >
              <Icon className="text-xl" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4">
        <div
          className="flex items-center gap-3 p-2 rounded-md cursor-pointer  transition-all hover:text-black hover:ml-4 hover:border-gray-400 hover:bg-white hover:shadow-md"
          onClick={() => handleLogout()}
        >
          <CiPower className="text-2xl font-bolder" />
          <span>लॉगआउट</span>
        </div>
        <div className="mt-4 text-sm text-center text-gray-400 flex gap-4 items-center">
          <img src="/bilaspur.svg" alt="bilaspur logo" className="rounded" />
          <div>
            <p>Created By</p>
            <p className="font-bold text-md text-black">BitCrackers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
