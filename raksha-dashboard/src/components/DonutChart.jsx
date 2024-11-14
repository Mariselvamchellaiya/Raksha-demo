import React from "react";
import Chart from "react-apexcharts";

function DonutChart({ data }) {
  const options = {
    chart: { type: "donut" },
    colors: ["#4bc0c0", "#36a2eb", "#ff6384"], // Use complementary colors
    labels: ["Promoters", "Passives", "Detractors"],
  };

  return (
    <Chart options={options} series={data.series} type="donut" height={350} />
  );
}

export default DonutChart;
