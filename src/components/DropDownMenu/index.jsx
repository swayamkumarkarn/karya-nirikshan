import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; 

const DropdownMenu = ({ options = [], defaultOption = "Select", onSelect ,tag}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); 
    if (onSelect) onSelect(option); 
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="py-2 px-3 border text-sm border-gray-400 text-black bg-white rounded-md flex items-center gap-2"
      >
        {tag ? `${tag} : ${selectedOption}` : selectedOption}
        <FaChevronDown
          className={`${isOpen ? "transform rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 text-sm w-48 bg-white border border-gray-300 rounded-md shadow-lg ">
          <ul className="py-2">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
