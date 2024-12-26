import React, { useState } from "react";
import Department from "../components/Home/department";
import TableHome from "../components/Home/homeTable"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {getDashboardStats, getDepartmentStats } from "../services/dashboardService";


const Dashboard = () => {
  const [mainCard, setMainCard] = useState([]);
  const [departmentCard, setDepartmentCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardMainCard = async () => {
      try {
        const response = await getDashboardStats();

        setMainCard(response.data[0]);
        // console.log("my response",response.data);
      } catch (err) {
        console.error("Failed to fetch documents:", err.message);
        setError("Failed to fetch documents.");
      } finally {
        setLoading(false);
      }
    };
    const fetchDepartments = async () => {
      try {
        const response = await getDepartmentStats();

        setDepartmentCard(response.data);
        console.log("my response",response.data);
      } catch (err) {
        console.error("Failed to fetch documents:", err.message);
        setError("Failed to fetch documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardMainCard();
    fetchDepartments();
  }, []);


  const userData = useSelector((state) => state.auth.user);

  const columns = [
    { key: "id", label: "आईडी", className: "font-semibold text-gray-400" },
    { key: "title", label: "शीर्षक", className: "font" },
    { key: "department", label: "शाखा" },
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
      <div className="flex flex-row w-[95%] justify-around rounded-xl bg-white mb-6 p-5 shadow-md border-b border-r-4">
        <div className="p-3 bg-white text-center flex-1 border-r border-gray-300">
          <h2 className="text-sm text-gray-400 font-semibold">कुल दस्तावेज़</h2>
          <p className="text-4xl font-semibold">{mainCard?.total_documents}</p>
        </div>

        <div className="p-3 bg-white  text-center flex-1 border-r border-gray-300">
          <h2 className="text-sm text-gray-400 font-semibold">निराकृत दस्तावेज़</h2>
          <p className="text-4xl font-semibold">{mainCard?.completed_documents}</p>
        </div>

        <div className="p-3 bg-white text-center flex-1">
          <h2 className="text-sm text-gray-400 font-semibold">लंबित दस्तावेज़</h2>
          <p className="text-4xl font-semibold">{mainCard?.pending_documents}</p>
        </div>
        <div className="p-3 bg-white text-center flex-1">
          <h2 className="text-sm text-gray-400 font-semibold">आज पंजीकृत दस्तावेज़</h2>
          <p className="text-4xl font-semibold">{mainCard?.today_inserted_documents}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6 w-[95%]">
        <Department departmentCard={departmentCard} />
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
