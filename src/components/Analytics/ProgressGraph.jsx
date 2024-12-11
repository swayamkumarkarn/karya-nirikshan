import React from "react";

const ProgressBarItem = ({ title, percentage, imageUrl ,color}) => {
  return (
    <li className="flex items-center mb-4 gap-4 pr-8">
      <div className="w-10 h-10 rounded overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

     
      <div className="flex flex-col w-full">
        <div className="text-sm font-semibold mb-1">{title}</div>
        <div className="flex items-center gap-2">
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
            <div
              className={`absolute top-0 left-0 bg-green-500 h-2.5 rounded-full full ${color}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600">{percentage}%</div>
        </div>
      </div>
    </li>
  );
};

export default ProgressBarItem;
