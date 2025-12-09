// components/dashboard/RecentOrders.tsx
export default function RecentOrders() {
  const orders = [
    { id: 1, customer: "John Doe", amount: "$120", status: "Completed" },
    { id: 2, customer: "Sarah Khan", amount: "$80", status: "Pending" },
    { id: 3, customer: "Aziz", amount: "$150", status: "Completed" },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow mt-5">
      <h2 className="text-xl font-bold mb-3">Recent Orders</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="p-2 border">{o.customer}</td>
              <td className="p-2 border">{o.amount}</td>
              <td className="p-2 border">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
