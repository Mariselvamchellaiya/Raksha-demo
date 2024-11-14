// src/components/LineChart.jsx
import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ data }) => {
  const chartData = {
    series: [
      {
        name: "NPS Score",
        data: data.map((item) => item.nps_score),
      },
      {
        name: "CES Score",
        data: data.map((item) => item.ces_score),
      },
    ],
    options: {
      chart: {
        type: "line",
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
          text: "Score",
        },
      },
      colors: ["#FF5733", "#C70039"],
      stroke: {
        curve: "smooth",
      },
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
      type="line"
      height={300}
    />
  );
};

export default LineChart;
