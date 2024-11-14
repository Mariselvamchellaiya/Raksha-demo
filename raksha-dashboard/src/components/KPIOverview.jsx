import React, { useEffect, useState } from "react";
import axios from "axios";
import KPIBarChart from "./KpiBarChart";
import Loading from "../Loading/Loading";

const KPIOverview = () => {
  const [data, setData] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/kpi_data`)
      .then((response) => {
        console.log(response);

        setData(response.data);
      })
      .catch((error) => console.error("Error fetching KPI data:", error));
  }, []);

  if (!data.length) return <Loading />;

  return (
    <div className="p-6 bg-gray-100 dark:bg-slate-800">
      <h1 className="text-3xl font-bold text-center mb-8">KPI Overview</h1>
      <div className="grid grid-cols-4 gap-6">
        {data.map((kpi) => (
          <div key={kpi.id}>
            {/* Revenue vs Target Revenue */}
            <KPIBarChart
              title={`Revenue vs Target Revenue for ${kpi.period}`}
              actualValue={kpi.revenue}
              targetValue={kpi.target_revenue}
              categories={[kpi.period]}
            />

            {/* Customers vs Target Customers */}
            <KPIBarChart
              title={`Customers vs Target Customers for ${kpi.period}`}
              actualValue={kpi.customers}
              targetValue={kpi.target_customers}
              categories={[kpi.period]}
            />

            {/* Acquisition Cost vs Target Acquisition Cost */}
            <KPIBarChart
              title={`Acquisition Cost vs Target for ${kpi.period}`}
              actualValue={kpi.acquisition_cost}
              targetValue={kpi.target_acquisition_cost}
              categories={[kpi.period]}
            />

            {/* Revenue per Customer vs Target Revenue per Customer */}
            <KPIBarChart
              title={`Revenue per Customer vs Target for ${kpi.period}`}
              actualValue={kpi.revenue_per_customer}
              targetValue={kpi.target_revenue_per_customer}
              categories={[kpi.period]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPIOverview;
