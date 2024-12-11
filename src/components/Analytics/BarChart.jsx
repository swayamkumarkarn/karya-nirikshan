import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  defs,
  linearGradient,
} from 'recharts';
import DropdownMenu from '../DropDownMenu';

const ActivityChart = () => {
  // Data for the chart
  const data = [
    { name: 'JAN', value: 100 },
    { name: 'FEB', value: 200 },
    { name: 'MAR', value: 300 },
    { name: 'APR', value: 250 },
    { name: 'MAY', value: 400 },
    { name: 'JUN', value: 350 },
    { name: 'JUL', value: 150 },
    { name: 'AUG', value: 100 },
    { name: 'SEP', value: 300 },
    { name: 'OCT', value: 350 },
    { name: 'NOV', value: 400 },
    { name: 'DEC', value: 450 },
  ];

  const filter = ['January', 'February', 'March', 'April', 'May', 'June'];

  const handleMonthSelect = (selectedMonth) => {
    console.log('Selected month:', selectedMonth);
  };

  return (
    <div className="bg-white rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold text-gray-800">Activity</h2>
        <DropdownMenu
          options={filter}
          defaultOption="Month"
          onSelect={handleMonthSelect}
        />
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={30}
          />
          <Tooltip
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: 8,
              border: 'none',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar dataKey="value" fill="url(#barColor)" radius={[10, 10, 0, 0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
