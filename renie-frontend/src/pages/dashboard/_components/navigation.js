import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Navigation = ({ isSidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setEmail(parsedUserData.email);
      setUserName(parsedUserData.name);
    }
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <>
      <aside
        className={`group/sidebar font-mono h-full border-r-4 border-dashed border-r-[#3D3B40] overflow-y-auto relative flex ${
          isSidebarOpen ? "w-full lg:w-80" : "w-0"
        } flex-col z-20 transition-width ease-in-out duration-300`}
      >
        <div className="flex items-center justify-between hover:bg-primary/5">
          <div
            role="button"
            className="flex items-center text-sm p-3 w-full hover:bg-gray-100"
          >
            <div className="gap-x-2 flex items-center max-w-[200px]">
              <CgProfile className="h-5 w-5 ml-4" />

              <span className="text-start font-bold">{email}</span>
            </div>
          </div>

          <p onClick={handleToggleSidebar} className="lg:hidden">
            <FaAngleDoubleLeft className="h-5 w-5 mr-6 " />
          </p>
        </div>

        <Link to="/dashboard/recycle">
          <div className="flex items-center justify-between h-8 hover:bg-gray-100 cursor-pointer">
            <span className="flex gap-x-3">
              <p className="h-5 w-5 ml-4">♻️</p>
              <p className="font-bold">Recycle</p>
            </span>
          </div>
        </Link>
        <Link to="/dashboard/userdashboard">
          <div className="flex items-center justify-between h-8 hover:bg-gray-100 cursor-pointer">
            <span className="flex gap-x-3">
              <p className="h-5 w-5 ml-4">📱</p>
              <p className="font-bold">{userName} Dashboard</p>
            </span>
          </div>
        </Link>
        <Link to="/dashboard/publicdashboard">
          <div className="flex items-center justify-between h-8 hover:bg-gray-100 cursor-pointer">
            <span className="flex gap-x-3">
              <p className="h-5 w-5 ml-4">🧑🏽‍💻</p>
              <p className="font-bold">Public Dashboard</p>
            </span>
          </div>
        </Link>
        <Link to="/dashboard/settings">
          <div className="flex items-center justify-between h-8 hover:bg-gray-100 cursor-pointer">
            <span className="flex gap-x-3">
              <p className="h-5 w-5 ml-4">⚙️</p>
              <p className="font-bold">Settings</p>
            </span>
          </div>
        </Link>
        <div
          className="flex items-center justify-between h-8 bg-gray-100 cursor-pointer"
          onClick={handleLogout}
        >
          <span className="flex gap-x-3">
            <p className="h-5 w-5 ml-4">👋🏽</p>
            <p className="font-bold">Logout</p>
          </span>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
