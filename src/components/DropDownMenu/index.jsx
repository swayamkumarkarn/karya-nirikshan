import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Importing the arrow icon

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (month) => {
    setSelectedMonth(month);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="py-2 px-4 border border-gray-400 text-black rounded-md flex items-center gap-2"
      >
        {selectedMonth} {/* Display the selected month */}
        <FaChevronDown
          className={`${isOpen ? "transform rotate-180" : ""}`} // Rotates the arrow when dropdown is open
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect("February")}
            >
              February
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect("March")}
            >
              March
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect("April")}
            >
              April
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
