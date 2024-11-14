// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/components/Login";
import Dashboard from "../src/components/Dashboard";
import ProtectedRoute from "../src/components/ProtectedRoute";
import KPIOverview from "../src/components/KPIOverview";

function App() {
  return (
    <Router>
      <div className=" w-full bg-blue-100">
        <Routes>
          {/* Route for the Login page */}
          <Route path="/" element={<Login />} />

          {/* Protected route for the Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/kpidata" element={<KPIOverview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
