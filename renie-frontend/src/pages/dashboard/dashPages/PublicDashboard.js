import React, { useState, useEffect } from "react";
import axios from "axios";
import PublicUserLineChart from "../_components/PublicUserLineChart";
import { format } from "date-fns";
import LineChart from "../_components/LineChart";
import BarChart from "../_components/BarChart";

const PublicDashboard = () => {
  const [userData, setuserData] = useState([]);
  const [maxPointsUser, setMaxPointsUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [quantities, setQuantities] = useState({
    plastic: 0,
    paper: 0,
    cans: 0,
    tetrapak: 0,
  });
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user`);
        setuserData(response.data);

        if (response.data.length > 0) {
          const userWithMaxPoints = response.data.reduce(
            (max, user) => (user.points > max.points ? user : max),
            response.data[0]
          );

          setMaxPointsUser(userWithMaxPoints);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/transaction`);
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

    fetchUserData();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md font-mono">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-2">
        Public Dashboard
      </h1>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🧑🏽‍💼</span>
          <p className="text-lg">Number of Users:</p>
        </div>
        <p className="text-3xl font-bold text-gray-700">{userData.length}</p>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🧑🏽💫</span>
          <p className="text-lg">User with Maximum Points:</p>
        </div>
        <p className="text-3xl font-bold text-gray-700">
          {maxPointsUser?.name} {maxPointsUser?.points}
        </p>
      </div>

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
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Daily count of new users joining the platform
          </h2>
          <PublicUserLineChart userData={userData} />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Material Quantities
          </h2>
          <BarChart quantities={quantities} />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Total number of Transactions done over time
          </h2>
          <LineChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default PublicDashboard;
