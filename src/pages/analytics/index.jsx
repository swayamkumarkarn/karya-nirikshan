
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import DropdownMenu from "../../components/DropDownMenu";

const data = [
  {
    name: "Jan 1",
    Pending: 4000,
    Delayed: 2400,
    Resolved: 2400,
    gap: 400,
  },
  {
    name: "Jan 2",
    Pending: 3000,
    Delayed: 1398,
    Resolved: 2210,
    gap: 400,
  },
  {
    name: "Jan 3",
    Pending: 2000,
    Delayed: 9800,
    Resolved: 2290,
    gap: 400,
  },
  {
    name: "Jan 4",
    Pending: 2780,
    Delayed: 3908,
    Resolved: 2000,
    gap: 400,
  },
  {
    name: "Jan 5",
    Pending: 1890,
    Delayed: 4800,
    Resolved: 2181,
    gap: 400,
  },
  {
    name: "Jan 6",
    Pending: 2390,
    Delayed: 3800,
    Resolved: 2500,
    gap: 400,
  },
  {
    name: "Jan 7",
    Pending: 3490,
    Delayed: 4300,
    Resolved: 2100,
    gap: 400,
  },
  {
    name: "Jan 8",
    Pending: 1890,
    Delayed: 4800,
    Resolved: 2181,
    gap: 400,
  },
  {
    name: "Jan 9",
    Pending: 2390,
    Delayed: 3800,
    Resolved: 2500,
    gap: 400,
  },
  {
    name: "Jan 10",
    Pending: 3490,
    Delayed: 4300,
    Resolved: 2100,
    gap: 400,
  },
  {
    name: "Jan 11",
    Pending: 4000,
    Delayed: 2400,
    Resolved: 2400,
    gap: 400,
  },
  {
    name: "Jan 12",
    Pending: 3000,
    Delayed: 1398,
    Resolved: 2210,
    gap: 400,
  },
  {
    name: "Jan 13",
    Pending: 2000,
    Delayed: 9800,
    Resolved: 2290,
    gap: 400,
  },
  {
    name: "Jan 14",
    Pending: 2780,
    Delayed: 3908,
    Resolved: 2000,
    gap: 400,
  },
  {
    name: "Jan 15",
    Pending: 1890,
    Delayed: 4800,
    Resolved: 2181,
    gap: 400,
  },
  {
    name: "Jan 16",
    Pending: 2390,
    Delayed: 3800,
    Resolved: 2500,
    gap: 400,
  },
  {
    name: "Jan 17",
    Pending: 3490,
    Delayed: 4300,
    Resolved: 2100,
    gap: 400,
  },
  {
    name: "Jan 18",
    Pending: 1890,
    Delayed: 4800,
    Resolved: 2181,
    gap: 400,
  },
];

export function Home() {
  return (
    <div className="bg-white p-4 max-w-fit rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-1">Document Growth</h1>
        <DropdownMenu />
      </div>

      {/* Responsive chart container */}
      <div className="w-fit">
        <BarChart
          width={450} // Make chart width responsive
          height={220} // Fixed height to maintain aspect ratio
          data={data}
          barSize={6}
          margin={{
            top: 20,
            right: 5,
            left: 0,
            bottom: 5,
          }}
          barCategoryGap="5%"
          barGap={0}
        >
          <CartesianGrid
            horizontal={true}
            strokeDasharray="6 6"
            vertical={false}
            stroke="#E1E1E1"
          />
          <Legend
            layout="horizontal"
            align="left"
            verticalAlign="bottom"
            iconType="circle" // Rounded legend icons
            iconSize={10} // Control the size of the round indicator
            wrapperStyle={{
              paddingTop: "20px",
              paddingLeft: "30px",
              fontSize: "10px",
            }}
          />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            axisLine={false}
            tick={{ fontSize: 10 }}
          />
          <YAxis stroke="#c4c4c4" />
          <Tooltip />
          <Bar
            dataKey="Delayed"
            stackId="a"
            fill="#CA6B6E"
            radius={[50, 50, 50, 50]}
          />
          <Bar dataKey="gap" stackId="a" fill="transparent" />
          <Bar
            dataKey="Resolved"
            stackId="a"
            fill="#478F96"
            radius={[50, 50, 50, 50]}
          />
          <Bar dataKey="gap" stackId="a" fill="transparent" />
          <Bar
            dataKey="Pending"
            stackId="a"
            fill="#D08726"
            radius={[50, 50, 50, 50]}
          />
        </BarChart>
      </div>
    </div>
  );
}

export const meta = {
  title: "Analytics Page",
  description: "This is the home page",
};

export default Home;
