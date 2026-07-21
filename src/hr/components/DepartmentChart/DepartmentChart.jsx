import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { departmentRatings } from "../../data/performanceData";
import "./DepartmentChart.css";

const DepartmentChart = () => {
  return (
    <div className="chart-card">
      <h2>Department Average Ratings</h2>
      <p className="chart-subtitle">
        Department performance overview
      </p>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={departmentRatings}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2A3A52" />

            <XAxis
              dataKey="department"
              stroke="#94A3B8"
            />

            <YAxis
              domain={[0, 5]}
              stroke="#94A3B8"
            />

            <Tooltip />

            <Bar
              dataKey="rating"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentChart;