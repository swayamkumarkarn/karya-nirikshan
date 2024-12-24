import React, { useEffect, useState } from 'react';
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
import { fetchActivityData } from '../../services/analyticsService';

const ActivityChart = () => {

  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    fetchActivityData()
      .then((response) => {
        if (response.success) {
          const formattedData = response.data.map((item) => ({
            name: item.name,
            value: parseInt(item.value, 10), 
          }));
          setAnalyticsData(formattedData);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold text-gray-800">Activity</h2>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={analyticsData}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
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
          <Bar
            dataKey="value"
            fill="url(#barColor)"
            radius={[10, 10, 0, 0]}
            barSize={12}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
