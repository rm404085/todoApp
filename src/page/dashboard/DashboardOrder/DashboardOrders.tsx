import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Fake orders data
const fakeOrders = Array.from({ length: 25 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  items: Math.floor(Math.random() * 5) + 1,
  amount: (Math.random() * 500).toFixed(2),
  status: ["Pending", "Completed", "Cancelled"][Math.floor(Math.random() * 3)],
  date: new Date(Date.now() - Math.random() * 1000000000).toLocaleDateString(),
}));

const DashboardOrders = () => {
  const [orders, setOrders] = useState(fakeOrders);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filtered data
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.customer.toLowerCase().includes(filter.toLowerCase()) ||
        o.id.toLowerCase().includes(filter.toLowerCase());
      const matchesStatus = statusFilter ? o.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [orders, filter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Handlers
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure to delete this order?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
      toast.success("Order deleted");
    }
  };

  const handleStatusUpdate = (id: string, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    toast.success(`Order status updated to ${status}`);
  };

  // Summary Data
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const completedOrders = orders.filter((o) => o.status === "Completed").length;
  const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;

  return (
    <div className="p-4">

      {/* Summary Cards */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {[
          { label: "Total Orders", value: totalOrders, color: "bg-white" },
          { label: "Pending", value: pendingOrders, color: "bg-yellow-100" },
          { label: "Completed", value: completedOrders, color: "bg-green-100" },
          { label: "Cancelled", value: cancelledOrders, color: "bg-red-100" },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${card.color} shadow p-4 rounded w-44 text-center`}
          >
            <div className="text-sm text-gray-700">{card.label}</div>
            <div className="text-xl font-semibold">{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 mb-4 flex-wrap"
      >
        <Input
          placeholder="Search by customer or ID..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />

        <select
          className="border rounded p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </motion.div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              {[
                "Order ID",
                "Customer",
                "Email",
                "Items",
                "Amount ($)",
                "Status",
                "Date",
                "Actions",
              ].map((header, i) => (
                <th key={i} className="border p-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {paginatedOrders.length === 0 && (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td colSpan={8} className="text-center p-4">
                    No orders found.
                  </td>
                </motion.tr>
              )}

              {paginatedOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.customer}</td>
                  <td className="border p-2">{order.email}</td>
                  <td className="border p-2">{order.items}</td>
                  <td className="border p-2">{order.amount}</td>

                  <td className="border p-2">
                    <select
                      className="border rounded p-1"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="border p-2">{order.date}</td>

                  <td className="border p-2 flex gap-2">
                    <Button size="sm">View</Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center mt-4"
        >
          <p>
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </Button>

            <Button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOrders;
