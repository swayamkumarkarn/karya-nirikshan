import React from 'react';
import { TiArrowDownThick } from "react-icons/ti";
import { TiArrowUpThick } from "react-icons/ti";

const department = () => {

    const data = [
        { category: "Finance", total: 121, resolved: 48, pending: 41, today: 32, change: 4.7, img: "/department/finance.svg" },
        { category: "Medical", total: 115, resolved: 41, pending: 48, today: 26, change: -1.3, img: "/department/finance.svg" },
        { category: "TA", total: 121, resolved: 48, pending: 41, today: 32, change: 4.7, img: "/department/finance.svg" },
        { category: "Contingency", total: 121, resolved: 48, pending: 41, today: 32, change: 4.7, img: "/department/finance.svg" },
        { category: "Complaint", total: 142, resolved: 48, pending: 41, today: 53, change: 4.7, img: "/department/finance.svg" },
        { category: "SRC", total: 121, resolved: 48, pending: 41, today: 32, change: 4.7, img: "/department/finance.svg" },
        { category: "Head Clerk", total: 121, resolved: 48, pending: 41, today: 32, change: 4.7, img: "/department/finance.svg" },
      ];
    return (
        <>
        {data.map((item, index) => (
        <div
            className={`px-7 py-12 bg-white shadow-md rounded-lg text-center border-l-4 hover:shadow-lg  `}
            key={index}
        >
           
            <div className="flex justify-between items-center mb-4 -mt-6">
                <h3 className="text-xl -ml-2  font-semibold">{item.category}</h3>
                <img
                    src={item.img}
                    height={40}
                    width={40}
                    className="bg-green-200 rounded-full"
                    alt={`${item.category} icon`}
                />
            </div>

            <div className="text-md mb-1 mt-1  grid grid-cols-2 justify-left justify-center ">
                <p className="flex flex-row items-center justify-left text-gray-500">
                    Total {" "}</p>
                <span className="font-semibold text-green-600 flex flex-row items-center text-lg justify-end mr-3">{item.total}</span>
            </div>

            <p className="text-md mb-1  grid grid-cols-2 justify-left justify-center ">
                <p className="flex flex-row items-center justify-left text-gray-500">Resolved{" "}</p>
                <span className="font-semibold text-green-600 flex flex-row items-center text-lg justify-end">{item.resolved}<TiArrowUpThick /> </span>
            </p>

            <p className="text-md mb-1 grid grid-cols-2   justify-center">
                <p className=" flex flex-row items-center justify-left text-gray-500">Pending{" "}</p>
                <span className="font-semibold text-red-600 flex flex-row justify-end items-center text-lg">{item.pending} <TiArrowDownThick /></span>
            </p>

            <div
                className={` mt-4 -ml-2 -mb-4 font-semibold grid grid-cols-2 justify-end text-sm  ${item.change > 0 ? "text-green-600" : "text-red-600"
                    }`}
            >
                <p className="flex flex-row items-center justify-left text-xl font-bold text-gray-500 ">Today</p>
                <span className="flex flex-row items-center whitespace-nowrap text-md justify-end"><p className='text-3xl text-gray-500'>{item.today} </p>({item.change > 0 ? <TiArrowUpThick className='rotate-45' /> : <TiArrowDownThick className='rotate-45' />}{Math.abs(item.change)}%)</span>
            </div>
        </div>
          ))}
          </>
    );
};

export default department;