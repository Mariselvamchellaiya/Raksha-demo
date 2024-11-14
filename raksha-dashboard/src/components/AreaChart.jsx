// src/components/AreaChart.jsx
import React from "react";
import Chart from "react-apexcharts";

const AreaChart = ({ data }) => {
  const chartData = {
    series: [
      {
        name: "Average Response Time",
        data: data.map((item) => item.average_response_time),
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
      },
      xaxis: {
        categories: data.map((item) => item.timestamp),
        title: {
          text: "Time",
        },
      },
      yaxis: {
        title: {
          text: "Response Time (hrs)",
        },
      },
      colors: ["#00aaff"],
      tooltip: {
        x: {
          format: "dd MMM",
        },
      },
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="area"
      height={300}
    />
  );
};

export default AreaChart;
