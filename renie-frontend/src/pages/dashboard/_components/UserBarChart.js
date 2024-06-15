import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const UserBarChart = ({ quantities }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={600}
          height={400}
          data={[
            { name: "Plastic", quantity: quantities.plastic },
            { name: "Paper", quantity: quantities.paper },
            { name: "Cans", quantity: quantities.cans },
            { name: "TetraPak", quantity: quantities.tetrapak },
          ]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#7AB2B2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserBarChart;
