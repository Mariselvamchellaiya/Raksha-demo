// src/components/MetricCard.jsx
import React from "react";
import { motion } from "framer-motion";

const MetricCard = ({ title, value, description, color }) => {
  return (
    <motion.div
      className="p-6 shadow-lg rounded-lg bg-white flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <div className={`text-4xl font-bold ${color} mt-4 mb-2`}>
        {value !== null ? value : <div className="loader">Loading...</div>}
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </motion.div>
  );
};

export default MetricCard;
