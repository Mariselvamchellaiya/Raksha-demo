// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute will redirect to Login if the user is not authenticated
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />; // Redirect to login page if no token found
  }

  return children; // Allow access to the children (Dashboard)
};

export default ProtectedRoute;
