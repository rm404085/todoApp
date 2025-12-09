// components/dashboard/Charts/RevenueChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 3500 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4200 },
];

export default function RevenueChart() {
  return (
    <div className="p-5 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="month"/>
        <YAxis/>
        <Tooltip/>
        <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3}/>
      </LineChart>
    </div>
  );
}
