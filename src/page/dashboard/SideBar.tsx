// components/dashboard/Sidebar.tsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/dashboard" className="hover:text-teal-300">Home</Link>
        <Link to="/tasks" className="hover:text-teal-300">Tasks</Link>
        <Link to="/products" className="hover:text-teal-300">Products</Link>
        <Link to="/wishlist" className="hover:text-teal-300">Wishlist</Link>
      </nav>
    </aside>
  );
}
