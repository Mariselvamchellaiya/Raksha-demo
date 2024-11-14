// src/components/DashboardHeader.jsx
import React from "react";

const DashboardHeader = ({ productName, toggleDarkMode }) => (
  <div className="flex justify-between items-center p-4 bg-gray-800 text-white dark:bg-gray-200 border rounded-lg dark:text-gray-800 mb-10">
    <h1 className="text-2xl font-bold">Bussiness Dashboard</h1>
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-blue-600 rounded dark:bg-blue-400"
    >
      Toggle Dark Mode
    </button>
  </div>
);

export default DashboardHeader;
