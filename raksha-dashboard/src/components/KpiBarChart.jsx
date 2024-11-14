import React from "react";
import Chart from "react-apexcharts";

const KPIBarChart = ({
  title,
  actualValue,
  targetValue,
  categories = ["Metric"],
}) => {
  const options = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "$ (USD)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`,
      },
    },
  };

  const series = [
    {
      name: "Actual",
      data: [actualValue || 0], // Fallback to 0 if undefined
    },
    {
      name: "Target",
      data: [targetValue || 0], // Fallback to 0 if undefined
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-md mb-10">
      <h2 className="font-bold text-lg text-center mb-2">{title}</h2>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default KPIBarChart;
