import React from 'react';
import { FaChartBar, FaFileAlt, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FiList } from "react-icons/fi";
import { useState } from 'react';
import { CiPower } from "react-icons/ci";

const SideBar = () => {

    
    const [activeItem, setActiveItem] = useState('Dashboard');

    const handleActiveClick = (item) => {
        setActiveItem(item); 
    };
    return (
        <div className="text-gray-400 font-semibold w-[17%] h-screen flex flex-col justify-between ">
       
            <div className="p-5">
                <div className="mb-8 flex flex-row items-center justify-center gap-4">
                    <FiList className='text-4xl font-bolder' />
                    <div className=''>
                        <h2 className="text-xl font-semibold text-black">Welcome,</h2>
                        <p className="text-lg text-gray-500">Good Afternoon</p>
                    </div>
                </div>

                <h2 className="text-xl  mb-5">Menu</h2>
                <div className="border-b-2 border-gray-200 mb-4 mx-5"></div>
                <ul className="space-y-3">
                    <li className={` flex text-md items-center gap-5 p-1 rounded-md hover:text-black cursor-pointer  ${activeItem === 'Dashboard' ? 'font-bold text-black' : 'hover:text-black'}`}
                        onClick={() => handleActiveClick('Dashboard')}>
                        <LuLayoutDashboard className="text-2xl" />
                        <span>Dashboard</span>
                    </li>
                    <li className={` flex text-md items-center gap-5 p-1 rounded-md hover:text-black cursor-pointer  ${activeItem === 'Analytics' ? 'font-bold text-black' : 'hover:text-black'}`}
                        onClick={() => handleActiveClick('Analytics')}>
                        <FaChartBar className="text-2xl" />
                        <span>Analytics</span>
                    </li>
                    <li className={` flex text-md items-center gap-5 p-1 rounded-md hover:text-black cursor-pointer  ${activeItem === 'Track Doc' ? 'font-bold text-black' : 'hover:text-black'}`}
                        onClick={() => handleActiveClick('Track Doc')}>
                        <IoLocationOutline className="text-2xl" />
                        <span>Track Doc</span>
                    </li>
                    <li className={` flex text-md items-center gap-5 p-1 rounded-md hover:text-black cursor-pointer  ${activeItem === 'All Documents' ? 'font-bold text-black' : 'hover:text-black'}`}
                        onClick={() => handleActiveClick('All Documents')}>
                        <FaFileAlt className="text-2xl" />
                        <span>All Documents</span>
                    </li>
                    <li className={` flex text-md items-center gap-5 p-1 rounded-md hover:text-black cursor-pointer  ${activeItem === 'Privacy Policy' ? 'font-bold text-black' : 'hover:text-black'}`}
                        onClick={() => handleActiveClick('Privacy Policy')}>
                        <FaShieldAlt className="text-2xl" />
                        <span>Privacy Policy</span>
                    </li>
                    <li className={` flex text-md items-center gap-5 p-1 rounded-md hover:text-black cursor-pointer  ${activeItem === 'Terms & Conditions' ? 'font-bold text-black' : 'hover:text-black'}`}
                        onClick={() => handleActiveClick('Terms & Conditions')}>
                        <FaFileAlt className="text-2xl" />
                        <span>Terms & Conditions</span>
                    </li>
                </ul>
            </div>

            
            <div className="p-5">
                <div className="flex text-md items-center gap-5 p-1 rounded-md hover:text-black cursor-pointer">
                <CiPower className="text-2xl font-bolder"  />
                    <span>Logout</span>
                </div>
                <div className="mt-8 text-sm text-center text-gray-400 flex flex-row gap-4">
                    <img src='/bilaspur.svg' alt='bilaspur logo' />
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
