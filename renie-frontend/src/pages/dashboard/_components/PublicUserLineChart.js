import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { parseISO, format } from "date-fns";

const PublicUserLineChart = ({ userData }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (userData.length > 0) {
      const groupedData = userData.reduce((acc, user) => {
        const date = format(parseISO(user.createdAt), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += 1;
        return acc;
      }, {});

      const formattedChartData = Object.keys(groupedData).map((date) => ({
        date,
        count: groupedData[date],
      }));

      setChartData(formattedChartData);
    }
  }, [userData]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#7AB2B2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PublicUserLineChart;
