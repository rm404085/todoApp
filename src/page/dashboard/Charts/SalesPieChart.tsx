// components/dashboard/Charts/SalesPieChart.tsx
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const data = [
  { name: "Electronics", value: 40 },
  { name: "Clothes", value: 25 },
  { name: "Shoes", value: 20 },
  { name: "Others", value: 15 },
];

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444"];

export default function SalesPieChart() {
  return (
    <div className="p-5 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Sales Distribution</h2>
      <PieChart width={600} height={250}>
        <Pie data={data} cx={150} cy={120} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
