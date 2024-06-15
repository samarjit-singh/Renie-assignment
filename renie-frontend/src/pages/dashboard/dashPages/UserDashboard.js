import React, { useEffect, useState } from "react";
import axios from "axios";
import UserPieChart from "../_components/UserPieChart";
import UserLineChart from "../_components/UserLineChart";
import UserBarChart from "../_components/UserBarChart";
import { format } from "date-fns";

const UserDashboard = () => {
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [quantities, setQuantities] = useState({
    plastic: 0,
    paper: 0,
    cans: 0,
    tetrapak: 0,
  });
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [userPoints, setUserPoints] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserId(parsedUserData.id);
    }
  }, []);

  useEffect(() => {
    const fetchUserPersonalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${userId}`
        );

        const points = response.data?.points;
        setUserPoints(points);
        console.log("user points", userPoints);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserPersonalData();
    }
  }, [userId, userPoints]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/transaction/user/${userId}`
        );
        setTransactions(response.data);

        const quantities = response.data.reduce(
          (acc, transaction) => {
            acc[transaction.compartment] += transaction.quantity;
            return acc;
          },
          { plastic: 0, paper: 0, cans: 0, tetrapak: 0 }
        );

        setQuantities(quantities);

        const cumulativeData = response.data.reduce((acc, transaction) => {
          const formattedDate = format(
            new Date(transaction.createdAt),
            "yyyy-MM-dd HH:mm:ss"
          );
          const cumulativeQuantity = {
            date: formattedDate,
            cumulativeTotal:
              acc.length > 0
                ? acc[acc.length - 1].cumulativeTotal + transaction.quantity
                : transaction.quantity,
          };
          acc.push(cumulativeQuantity);
          return acc;
        }, []);

        setChartData(cumulativeData);

        const totalQuantity = Object.values(quantities).reduce(
          (sum, quantity) => sum + quantity,
          0
        );
        setTotalQuantity(totalQuantity);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md font-mono">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-2">
        User Dashboard
      </h1>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">📈</span>
          <p className="text-lg">Number of Transactions:</p>
        </div>
        <p className="text-3xl font-bold text-gray-700">
          {transactions.length}
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🪙</span>
          <p className="text-lg">Points Earned:</p>
        </div>
        <p className="text-3xl font-bold text-gray-700">{userPoints}</p>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🥤</span>
          <p className="text-lg">Total Plastic Quantity:</p>
        </div>
        <p className="text-3xl font-bold text-gray-700">{quantities.plastic}</p>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">📄</span>
          <p className="text-lg">Total Paper Quantity:</p>
        </div>
        <p className="text-3xl font-bold text-gray-700">{quantities.paper}</p>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🥫</span>
          <p className="text-lg">Total Cans Quantity:</p>
        </div>
        <p className="text-3xl font-bold text-gray-700">{quantities.cans}</p>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🧃</span>
          <p className="text-lg">Total TetraPack Quantity:</p>
        </div>
        <p className="text-3xl font-bold text-gray-700">
          {quantities.tetrapak}
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">📊</span>
          <p className="text-lg">Total Quantity:</p>
        </div>
        <p className="text-3xl font-bold text-gray-700">{totalQuantity}</p>
      </div>

      <div className="mt-8">
        <UserBarChart quantities={quantities} />
        <UserLineChart chartData={chartData} />
      </div>
    </div>
  );
};

export default UserDashboard;
