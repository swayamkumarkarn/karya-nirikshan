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
          onClick={() => console.log("बटन क्लिक किया गया!")}
          size="small"
        />

        <div className="flex gap-5  ">
          <div className="relative flex-grow">
            <SearchBar
              placeholder="दस्तावेज़ विवरण से खोजें..."
              onChange={(e) => console.log(e.target.value)} // आप यहाँ खोज लॉजिक लागू कर सकते हैं
            />
          </div>

          <CustomButton
            onlyIcon
            color="yellow"
            startIcon={<FaPlus className="text-xl font-bold" />}
            onClick={() => console.log("बटन क्लिक किया गया!")}
            size="small"
          />
        </div>

        {/* <button className="bg-black text-white px-8 py-2 rounded font-semibold shadow-md">
          अनुरोध
        </button> */}

        <CustomButton
          text={"अनुरोध"}
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
            <p className="text-sm font-semibold">चिकित्सा विभाग</p>
            <p className="text-sm">व्यवस्थापक</p>
          </div>
        </div>
      </button>
    </header>
  );
};

export default Header;
