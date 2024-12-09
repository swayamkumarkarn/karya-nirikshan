import React from "react";
// import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import SearchBar from "../Common/Searchbar";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import CustomButton from "../Common/CustomButton";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header
      className={` text-black px-6 py-4 flex items-center transition-all duration-300 ${
        isSidebarOpen ? "w-[100%]" : "w-full"
      }`}
    >
      <div className="flex items-start space-x-4 flex-grow">
        <CustomButton
          onlyIcon
          color="white"
          background="black"
          startIcon={<HiMiniAdjustmentsHorizontal className="text-xl" />}
          onClick={() => console.log("Button clicked!")}
          size="small"
        />

        <div className="flex gap-5  ">
          <div className="relative flex-grow">
            <SearchBar
              placeholder="Search by Document details..."
              onChange={(e) => console.log(e.target.value)} // You can implement the search logic here
            />
          </div>

          <CustomButton
            onlyIcon
            color="yellow"
            startIcon={<FaPlus className="text-xl font-bold" />}
            onClick={() => console.log("Button clicked!")}
            size="small"
          />
        </div>

        {/* <button className="bg-black text-white px-8 py-2 rounded font-semibold shadow-md">
          Requests
        </button> */}

        <CustomButton
          text={"Requests"}
          variant="contained"
          size={"small"}
          // sx={{
          //   padding: "7px 24px",
          // }}
        />
      </div>

      <button onClick={toggleSidebar}>
        <div
          className={`flex items-center space-x-4 cursor-pointer p-2 rounded-lg bg-black text-white transition-all duration-300 ${
            isSidebarOpen ? "mr-80" : "mr-0"
          }`}
        >
          <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
            M
          </div>
          <div>
            <p className="text-sm font-semibold">Medical Department</p>
            <p className="text-sm">Admin</p>
          </div>
        </div>
      </button>
    </header>
  );
};

export default Header;
