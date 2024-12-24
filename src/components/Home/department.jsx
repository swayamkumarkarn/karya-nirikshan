import React from "react";
import { TiArrowDownThick } from "react-icons/ti";
import { TiArrowUpThick } from "react-icons/ti";

const department = ({departmentCard}) => {
  const data = [
    {
      category: "स्टेनो",
      total: 121,
      resolved: 48,
      pending: 41,
      today: 32,
      change: 4.7,
      img: "/department/finance.svg",
    },
    {
      category: "चिकित्सा",
      total: 115,
      resolved: 41,
      pending: 48,
      today: 26,
      change: -1.3,
      img: "/department/finance.svg",
    },
    {
      category: "TA",
      total: 121,
      resolved: 48,
      pending: 41,
      today: 32,
      change: 4.7,
      img: "/department/finance.svg",
    },
    {
      category: "आपातकाल",
      total: 121,
      resolved: 48,
      pending: 41,
      today: 32,
      change: 4.7,
      img: "/department/finance.svg",
    },
    {
      category: "शिकायत",
      total: 142,
      resolved: 48,
      pending: 41,
      today: 53,
      change: 4.7,
      img: "/department/finance.svg",
    },
    {
      category: "SRC",
      total: 121,
      resolved: 48,
      pending: 41,
      today: 32,
      change: 4.7,
      img: "/department/finance.svg",
    },
    {
      category: "मुख्य लिपिक",
      total: 121,
      resolved: 48,
      pending: 41,
      today: 32,
      change: 4.7,
      img: "/department/finance.svg",
    },
  ];

  return (
    <>
      {departmentCard.map((item, index) => (
        <div
          className={`px-7 py-12 bg-white shadow-md rounded-lg text-center border-r-4 border-b hover:shadow-lg`}
          key={index}
        >
          <div className="flex justify-between items-center mb-4 -mt-6">
            <h3 className="text-base -ml-2 font-semibold">{item.department_hindi_name}</h3>
            <img
              src={"/department/finance.svg"}
              height={40}
              width={40}
              className="bg-green-200 rounded-full"
              alt={`${item.category} आइकन`}
            />
          </div>

          <div className="text-md mb-1 mt-1 grid grid-cols-2 justify-left justify-center ">
            <p className="flex flex-row items-center justify-left text-gray-500">
              कुल{" "}
            </p>
            <span className="font-semibold text-green-600 flex flex-row items-center text-lg justify-end mr-3">
              {item.total_documents}
            </span>
          </div>

          <p className="text-md mb-1 grid grid-cols-2 justify-left justify-center ">
            <p className="flex flex-row items-center justify-left text-gray-500">
            निराकृत{" "}
            </p>
            <span className={`font-semibold text-green-600 flex flex-row items-center text-lg justify-end ${item.completed_progress?"":"mr-3"} `}>
              {item.completed_documents}
              {item.completed_progress&&(<TiArrowUpThick />)}
            </span>
          </p>

          <p className="text-md mb-1 grid grid-cols-2 justify-center">
            <p className="flex flex-row items-center justify-left text-gray-500">
              लंबित{" "}
            </p>
            <span className="font-semibold text-red-600 flex flex-row justify-end items-center text-lg mr-3">
              {item.pending_documents}
               {/* <TiArrowDownThick />  */}
            </span>
          </p>

          <div
            className={`mt-4 -ml-2 -mb-4 font-semibold grid grid-cols-2 justify-end text-sm ${
              item.change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <p className="flex flex-row items-center justify-left text-lg font-bold text-gray-500 ">
              आज
            </p>
            <span className="flex flex-row items-center whitespace-nowrap text-md justify-end">
              <p className="text-xl text-gray-500 mr-3">{item.today_inserted_documents} </p>
              {/* (
              {item.change > 0 ? (
                <TiArrowUpThick className="rotate-45" />
              ) : (
                <TiArrowDownThick className="rotate-45" />
              )}
              {Math.abs(item.change)}%) */}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default department;
