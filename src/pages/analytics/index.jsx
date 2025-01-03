import React, { useState, useEffect } from "react";
import GrowthGraph from "../../components/Analytics/GrowthGraph";
import DropdownMenu from "../../components/DropDownMenu/index";
import ProgressBarItem from "../../components/Analytics/ProgressGraph";
import CircularProgress from "../../components/Analytics/StatusBar";
import ActivityChart from "../../components/Analytics/BarChart";
import { getDashboardStats } from "../../services/dashboardService";

const Dashboard = () => {
  const timeframes = ["All-time", "Last Week", "Last Month"];
  const categories = ["All", "Finance", "Medical"];
  const statuses = ["All", "Resolved", "Pending"];

  const [analyticsStart, setAnalyticsStar] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const progressData2 = [
    { title: "Finance", percentage: 74, imageUrl: "/assets/images/user.png", color: "bg-pink-200" },
    { title: "Medical", percentage: 52, imageUrl: "/assets/images/user.png", color: "bg-pink-400" },
    { title: "Complaints", percentage: 36, imageUrl: "/assets/images/user.png", color: "bg-pink-600" },
  ];

  const progressData = [
    { title: "Finance", percentage: 92, imageUrl: "/assets/images/user.png", color: "bg-green-200" },
    { title: "Medical", percentage: 85, imageUrl: "/assets/images/user.png", color: "bg-green-400" },
    { title: "Complaints", percentage: 89, imageUrl: "/assets/images/user.png", color: "bg-green-600" },
  ];

  const statusData = [
    { title: "Avg Delay", percentage: 25, color: "#ef4444" },
    { title: "Resolved", percentage: 79, color: "#22c55e" },
    { title: "Pending", percentage: 52, color: "#f59e0b" },
  ];


  const handleMonthSelect = (selectedMonth) => {
    console.log("Selected month:", selectedMonth);
  };

  useEffect(() => {

    getDashboardStats()
      .then((response) => {
        if (response.success) {

          setAnalyticsStar(response.data);
          console.log("response", response);
        } else {
          setError('Failed to load analytics data.');
        }
      })
      .catch((err) => {
        console.error('Error fetching analytics data:', err);
        setError('An error occurred while fetching data.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-6 bg-gray-100 min-h-screen mb-5 Z-none">

      <h1 className="text-2xl mb-5 font-bold  ">Reports</h1>
      <div className="border-t-2 border-gray-200"></div>
      <div className="flex justify-between items-center my-5 ">

        <div className="flex gap-4">
          <DropdownMenu options={timeframes}
            defaultOption="Select a timeframe"
            tag="Timeframe"
            onSelect={handleMonthSelect} />

          <DropdownMenu options={categories}
            defaultOption="Select a categories"
            tag="Category"
            onSelect={handleMonthSelect} />
          <DropdownMenu options={statuses}
            defaultOption="Select a status"
            tag="Status"
            onSelect={handleMonthSelect} />
        </div>
      </div>

      <div className="flex flex-row gap-6">
        <div className="flex flex-col w-[37%] gap-4">
          <div className="bg-white shadow rounded-lg p-4">

            <ActivityChart />
          </div>

          <div className="bg-white shadow rounded-lg p-4 mt-1">
            <h2 className="text-md text-gray-400 font-semibold mb-1">Pending Documents</h2>
            <ul>
              {progressData2.map((item, index) => (

                <ProgressBarItem key={index} {...item} />
              ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-md text-gray-400 font-semibold mb-1">Resolved Documents</h2>
            <ul>
              {progressData.map((item, index) => (
                <ProgressBarItem key={index} {...item} />
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col w-[63%] h-full gap-5">

          <div className="grid grid-cols-3 gap-4 h-max w-full">
            {statusData.map((data, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4 py-4">
                <div className="flex flex-row justify-between items-center ">
                  <h3 className="text-md text-gray-600 font-semibold ">{data.title}</h3>

                  <DropdownMenu options={timeframes}
                    defaultOption="Day"
                    onSelect={handleMonthSelect} />
                </div>

                <CircularProgress percentage={data.percentage} color={data.color} />
              </div>
            ))}
          </div>


          <div className="flex flex-row gap-4">
            {analyticsStart && analyticsStart.map((data, index) => (
              <div key={index} className="flex flex-col gap-6">
                <div className="bg-white shadow rounded-lg p-6 text-center">
                  <h3 className="text-md text-gray-400 font-semibold">Total Docs</h3>
                  <p className="text-2xl font-bold mt-2">{data.total_documents}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6 text-center">
                  <h3 className="text-md text-gray-400 font-semibold">Pending Docs</h3>
                  <p className="text-2xl font-bold mt-2">{data.pending_documents}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6 text-center">
                  <h3 className="text-md text-gray-400 font-semibold">Resolved Docs</h3>
                  <p className="text-2xl font-bold mt-2">{data.completed_documents}</p>
                </div>
              </div>
            ))}

            <div className="bg-white shadow rounded-lg p-4 ">
              <GrowthGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

export const meta = {
  title: "विश्लेषण पृष्ठ",
  description: "यह विश्लेषण पृष्ठ है",
};
