// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({
    placeholder,
    name,
    onChange,
}) {
    return (
        <div>
            <div className="relative mr-1">
                {/* <FontAwesomeIcon 
                    icon="fa-solid fa-magnifying-glass" 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" 
                /> */}
                <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"  size={20} />
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={onChange}
                    className="w-80 py-2 px-4 pl-10 pr-10 border border-gray-300 rounded-md text-sm"
                />
            </div>
        </div>
    );
}
