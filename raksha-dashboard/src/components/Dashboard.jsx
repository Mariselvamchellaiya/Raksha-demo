// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  fetchAverageResponseTime,
  fetchCsatScore,
  fetchCesScore,
  fetchNpsScore,
  fetchSatisfactionBreakdown,
  fetchTrends,
} from "../utils/ApiServices";
import MetricCard from "../components/MetricCard";
import TrendChartCard from "../components/TrendChart"; // Using TrendChart in a card
import BreakdownChart from "../components/BreakdownChart";
import DashboardHeader from "./DashboardHeader";
import AreaChart from "../components/AreaChart";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import KPIOverview from "./KPIOverview";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [metrics, setMetrics] = useState({
    productName: null,
    averageResponseTime: null,
    csatScore: null,
    cesScore: null,
    npsScore: null,
    breakdown: null,
    trends: [],
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const fetchMetricsData = async () => {
    setLoading(true);
    try {
      const [avgResponse, csat, ces, nps, breakdown, trends] =
        await Promise.all([
          fetchAverageResponseTime(),
          fetchCsatScore(),
          fetchCesScore(),
          fetchNpsScore(),
          fetchSatisfactionBreakdown(),
          fetchTrends(),
        ]);

      setMetrics({
        productName: avgResponse.data.product_name,
        averageResponseTime: avgResponse.data.average_response_time,
        csatScore: csat.data.csat_score,
        cesScore: ces.data.ces_score,
        npsScore: nps.data.nps_score,
        breakdown: breakdown.data,
        trends: trends.data,
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMetricsData();
    const interval = setInterval(fetchMetricsData, 10000); // Polling every 10 seconds for real-time updates
    return () => clearInterval(interval);
  }, []);

  const handlenav = () => {
    navigate("/kpidata");
  };

  return (
    <div className="p-8 ">
      {loading ? (
        <Loading />
      ) : (
        <div className={darkMode ? "dark" : ""}>
          <DashboardHeader
            productName={metrics.productName}
            toggleDarkMode={toggleDarkMode}
          />
          {/* Button to navigate to KPI Data Page */}
          <div className="flex justify-end mb-4">
            {/* <Link to="/kpi-data"> */}
            <button
              className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handlenav}
            >
              View KPI Data
            </button>
            {/* </Link> */}
          </div>
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-3">
              <MetricCard
                title="Avg Response Time"
                value={metrics.averageResponseTime}
                description="Last 30 days"
                color="text-blue-600"
              />
            </div>
            <div className="col-span-3">
              <MetricCard
                title="CSAT Score"
                value={metrics.csatScore}
                description="Customer Satisfaction"
                color="text-green-600"
              />
            </div>
            <div className="col-span-3">
              <MetricCard
                title="CES Score"
                value={metrics.cesScore}
                description="Customer Effort Score"
                color="text-yellow-600"
              />
            </div>
            <div className="col-span-3">
              <MetricCard
                title="NPS Score"
                value={metrics.npsScore}
                description="Net Promoter Score"
                color="text-purple-600"
              />
            </div>

            <div className="col-span-6">
              <BreakdownChart breakdownData={metrics.breakdown} />
            </div>
            <div className="col-span-6">
              <TrendChartCard trendsData={metrics.trends} />
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 col-span-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Response Time Over Months
              </h3>
              <AreaChart data={metrics.trends} />
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 col-span-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                CSAT Score by Product
              </h3>
              <BarChart data={metrics.trends} />
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 col-span-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                NPS and CES Trends
              </h3>
              <LineChart data={metrics.trends} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
