// src/components/TrendChartCard.jsx
import React from "react";
import Chart from "react-apexcharts";
import { ResponsiveContainer } from "recharts";

const TrendChartCard = ({ trendsData }) => {
  // Prepare the data for ApexCharts
  const timestamps = trendsData.map((item) => item.timestamp);
  const averageResponseTime = trendsData.map(
    (item) => item.average_response_time
  );
  const csatScore = trendsData.map((item) => item.csat_score);

  const options = {
    chart: {
      type: "line",
      height: 300,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: timestamps,
      title: {
        text: "Timestamp",
      },
    },
    yaxis: {
      title: {
        text: "Values",
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy", // Customize the date format as needed
      },
    },
    colors: ["#8884d8", "#82ca9d"],
    legend: {
      position: "top",
    },
  };

  const series = [
    {
      name: "Average Response Time",
      data: averageResponseTime,
    },
    {
      name: "CSAT Score",
      data: csatScore,
    },
  ];

  return (
    <div className="p-6 shadow-lg rounded-lg bg-white flex flex-col items-center text-center">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Trends Over Time
      </h3>
      <Chart options={options} series={series} type="line" height={285} />
    </div>
  );
};

export default TrendChartCard;
