import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import PublicUserLineChart from "../_components/PublicUserLineChart";
import LineChart from "../_components/LineChart";
import BarChart from "../_components/BarChart";
import DashboardCard from "../_components/DashboardCard";
import { userRoute } from "../../../utils/ApiRoutes";
import { transactionRoute } from "../../../utils/ApiRoutes";

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
        const response = await axios.get(userRoute);
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
        const response = await axios.get(transactionRoute);
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

      <DashboardCard
        icon="🧑🏽‍💼"
        label="Number of Users"
        value={userData.length}
      />
      <DashboardCard
        icon="🧑🏽💫"
        label="User with Maximum Points"
        value={`${maxPointsUser?.name} ${maxPointsUser?.points}`}
      />
      <DashboardCard
        icon="📈"
        label="Number of Transactions"
        value={transactions.length}
      />
      <DashboardCard
        icon="🥤"
        label="Total Plastic Quantity"
        value={quantities.plastic}
      />
      <DashboardCard
        icon="📄"
        label="Total Paper Quantity"
        value={quantities.paper}
      />
      <DashboardCard
        icon="🥫"
        label="Total Cans Quantity"
        value={quantities.cans}
      />
      <DashboardCard
        icon="🧃"
        label="Total TetraPack Quantity"
        value={quantities.tetrapak}
      />
      <DashboardCard icon="📊" label="Total Quantity" value={totalQuantity} />

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
