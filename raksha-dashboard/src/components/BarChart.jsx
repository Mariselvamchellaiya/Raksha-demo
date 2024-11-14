// src/components/BarChart.jsx
import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
  const chartData = {
    series: [
      {
        name: "CSAT Score",
        data: data.map((item) => item.csat_score),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      xaxis: {
        categories: data.map((item) => item.timestamp),
        title: {
          text: "Time",
        },
      },
      yaxis: {
        title: {
          text: "CSAT Score",
        },
      },
      colors: ["#34D399"],
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height={300}
    />
  );
};

export default BarChart;
