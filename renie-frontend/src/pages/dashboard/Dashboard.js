import React, { useState, useEffect } from "react";
import Navigation from "./_components/navigation";
import { BiSolidFoodMenu } from "react-icons/bi";
import { Routes, Route } from "react-router-dom";
import Recycle from "./dashPages/Recycle";
import UserDashboard from "./dashPages/UserDashboard";
import Settings from "./dashPages/Settings";
import PublicDashboard from "./dashPages/PublicDashboard";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 1023;
      setSidebarOpen(!isSmallScreen);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex relative">
      <Navigation
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 relative h-full overflow-y-auto">
        <BiSolidFoodMenu
          className="h-6 w-6 cursor-pointer absolute top-5 left-1 lg:hidden"
          onClick={toggleSidebar}
        />

        <Routes>
          <Route path="/" element={<Recycle />} />
          <Route path="/recycle" element={<Recycle />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/publicdashboard" element={<PublicDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
