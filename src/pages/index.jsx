import React from "react";
import Department from "../components/Home/department";
import TableHome from "../components/Home/homeTable"
import { useSelector } from "react-redux";
import { useEffect } from "react";


const Dashboard = () => {


  const userData = useSelector((state) => state.auth.user);

  const columns = [
    { key: "id", label: "आईडी", className: "font-semibold text-gray-400" },
    { key: "title", label: "शीर्षक", className: "font-semibold" },
    { key: "department", label: "विभाग" },
    { key: "grade", label: "ग्रेड" },
  ];

  const documents = [
    { id: 856, title: "चिकित्सा के लिए पुनर्भरण अनुरोध", department: "हेड क्लर्क", grade: "ग्रेड B" },
    { id: 856, title: "चिकित्सा के लिए पुनर्भरण अनुरोध", department: "हेड क्लर्क", grade: "ग्रेड B" },
    { id: 856, title: "चिकित्सा के लिए पुनर्भरण अनुरोध", department: "हेड क्लर्क", grade: "ग्रेड C" },
    { id: 856, title: "चिकित्सा के लिए पुनर्भरण अनुरोध", department: "हेड क्लर्क", grade: "ग्रेड A" },
  ];

  useEffect(() => {
    console.log("Persisted User Data:", userData); // Log persisted data
  }, [userData]);

  return (
    <div className="p-6">
      <div className="flex flex-row w-[90%] justify-around rounded-xl bg-white mb-6 p-5 shadow-md border-b border-r">
        <div className="p-3 bg-white text-center flex-1 border-r border-gray-300">
          <h2 className="text-sm text-gray-400 font-semibold">कुल दस्तावेज़</h2>
          <p className="text-5xl font-semibold">156</p>
        </div>

        <div className="p-3 bg-white  text-center flex-1 border-r border-gray-300">
          <h2 className="text-sm text-gray-400 font-semibold">सुलझाए गए दस्तावेज़</h2>
          <p className="text-5xl font-semibold">97</p>
        </div>

        <div className="p-3 bg-white text-center flex-1">
          <h2 className="text-sm text-gray-400 font-semibold">लंबित दस्तावेज़</h2>
          <p className="text-5xl font-semibold">68</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 w-[90%]">
        <Department />
      </div>

      <TableHome data={documents} columns={columns} />
    </div>
  );
};

export default Dashboard;

export const meta = {
  title: "मुख्य पृष्ठ",
  description: "यह मुख्य पृष्ठ है",
};
