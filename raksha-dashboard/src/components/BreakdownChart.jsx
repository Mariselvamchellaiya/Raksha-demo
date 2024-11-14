// src/components/BreakdownChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BreakdownChart = ({ breakdownData }) => {
  // Structure the data for the chart
  const data = [
    { name: "Promoters", value: breakdownData.promoters_percentage },
    { name: "Passives", value: breakdownData.passives_percentage },
    { name: "Detractors", value: breakdownData.detractors_percentage },
  ];

  // Define colors for each segment of the pie chart
  const COLORS = ["#4CAF50", "#FF9800", "#F44336"];

  return (
    <div className="p-6 shadow-lg rounded-lg bg-white flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Customer Satisfaction Breakdown
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BreakdownChart;
