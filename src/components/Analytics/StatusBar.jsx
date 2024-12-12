import React from "react";

const CircularProgress = ({ percentage, color }) => {
  const strokeDasharray = `${percentage}, 100`; 

  return (
    <div className="relative flex justify-center items-center rounded ">
    
      <svg
        className="w-30 h-30 transform -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
      
        <circle
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          cx="18"
          cy="18"
          r="15.9155"
        />
      
        <circle
          stroke={color} 
          strokeWidth="3"
          fill="none"
          strokeDasharray={strokeDasharray}
          cx="18"
          cy="18"
          r="15.9155"
        />
      </svg>
    
      <span className="absolute text-5xl font-bold">{percentage}%</span>
    </div>
  );
};

export default CircularProgress;
