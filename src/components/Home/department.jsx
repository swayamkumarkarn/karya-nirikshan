import React from 'react';
import { TiArrowDownThick } from "react-icons/ti";
import { TiArrowUpThick } from "react-icons/ti";

const department = () => {

    const data = [
        { category: "Finance", total: 121, resolved: 48, pending: 41, today: 32, change: 4.7, img: "/department/finance.png" },
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
            className={`p-4 bg-white shadow-md rounded-lg text-center border-l-4 `}
            key={index}
        >
           
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{item.category}</h3>
                <img
                    src={item.img}
                    height={40}
                    width={40}
                    className="bg-green-200 rounded-full"
                    alt={`${item.category} icon`}
                />
            </div>

            <div className="text-lg mb-1  grid grid-cols-2 justify-left justify-center ">
                <p className="flex flex-row items-center justify-left">
                    Total {" "}</p>
                <span className="font-semibold text-green-600 flex flex-row items-center text-lg">{item.total}</span>
            </div>

            <p className="text-lg mb-1  grid grid-cols-2 justify-left justify-center ">
                <p className="flex flex-row items-center justify-left">Resolved{" "}</p>
                <span className="font-semibold text-green-600 flex flex-row items-center text-lg">{item.resolved}<TiArrowUpThick /> </span>
            </p>

            <p className="text-lg mb-1 grid grid-cols-2   justify-center">
                <p className=" flex flex-row items-center justify-left">Pending{" "}</p>
                <span className="font-semibold text-red-600 flex flex-row items-center">{item.pending} <TiArrowDownThick /></span>
            </p>

            <div
                className={`text-lg font-bold grid grid-cols-2 justify-center  ${item.change > 0 ? "text-green-600" : "text-red-600"
                    }`}
            >
                <p className="flex flex-row items-center justify-left text-gray-500 ">Today</p>
                <span className="flex flex-row items-center whitespace-nowrap text-md"><p className='text-3xl text-gray-500'>{item.today} </p>({item.change > 0 ? <TiArrowUpThick /> : <TiArrowDownThick />}{Math.abs(item.change)}%)</span>
            </div>
        </div>
          ))}
          </>
    );
};

export default department;