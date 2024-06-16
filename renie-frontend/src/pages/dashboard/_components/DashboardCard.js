import React from "react";

const DashboardCard = ({ icon, label, value }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-3xl mr-2">{icon}</span>
        <p className="text-lg">{label}:</p>
      </div>
      <p className="text-3xl font-bold text-gray-700">{value}</p>
    </div>
  );
};

export default DashboardCard;
