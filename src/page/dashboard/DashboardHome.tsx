
import StatsCard from "./StatsCard";
import RevenueChart from "./Charts/RevenueChart";
import SalesPieChart from "./Charts/SalesPieChart";

import { useAppSelector } from "@/redux/hook";
import RecentOrders from "./RecentOder";

export default function DashboardHome() {
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  return (
    <div className="p-6 space-y-6">

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatsCard title="Total Tasks" value={tasks.length} color="blue" />
        <StatsCard title="Wishlist Items" value={wishlist.length} color="green" />
        <StatsCard title="Revenue" value="$12,400" color="yellow" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <SalesPieChart />
      </div>

      {/* Recent Orders */}
      <RecentOrders />

    </div>
  );
}
