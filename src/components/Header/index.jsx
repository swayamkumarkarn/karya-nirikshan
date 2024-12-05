import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaPlus } from "react-icons/fa6";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";


const Header = () => {
    return (
        <header className="w-full text-black px-6 py-4 flex justify-between items-center ">
           
            <div className="flex items-center space-x-4 flex-grow">
                <button className="bg-black text-white px-3 py-2 rounded font-bold shadow-md">
                    <HiMiniAdjustmentsHorizontal  className='text-xl'/>
                </button>
               
                <div className='flex gap-5 w-[40%]'>
                    <div className="relative flex-grow ">
                        
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <FiSearch size={20} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by Document details..."
                            className="w-full px-10 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none"
                        />
                    </div>

                  
                    <button className="bg-yellow-500 text-black  px-3 py-2 rounded font-bold shadow-md">
                        <FaPlus className='text-xl font-bold' />
                    </button>
                </div>

               
                <button className="bg-black text-white px-8 py-2 rounded font-semibold shadow-md">
                    Requests
                </button>
            </div>

          
          <button>
          <div className="flex items-center space-x-4 cursor-pointer bg-black p-2 text-white rounded-lg">
               
                <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    M
                </div>
                
                <div>
                    <p className="text-sm font-semibold">Medical Department</p>
                    <p className="text-sm ">Admin</p>
                </div>
            </div>
          </button>
        </header>
    );
};

export default Header;
