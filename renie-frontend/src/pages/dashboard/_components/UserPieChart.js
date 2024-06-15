import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const UserPieChart = ({ quantities }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div>
      <h2>Pie Chart</h2>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="quantity"
          data={[
            { name: "Plastic", quantity: quantities.plastic },
            { name: "Paper", quantity: quantities.paper },
            { name: "Cans", quantity: quantities.cans },
            { name: "TetraPak", quantity: quantities.tetrapak },
          ]}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {COLORS.map((color, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default UserPieChart;
