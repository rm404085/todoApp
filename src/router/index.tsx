import App from "@/App";
import Counter from "@/components/Counter/Counter";
import Products from "@/components/Products/Products";
import Tasks from "@/components/tasks/Tasks";
import Login from "@/page/login/Login";
import Register from "@/page/login/register/Register";
import WishlistPage from "@/page/WishList/WishListPage";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute"; // 👈 add
import ProductDetails from "@/components/Products/ProductsDetails";

import DashboardLayout from "@/layout/DashboardLayout";
import DashboardHome from "@/page/dashboard/DashboardHome";
import DashboardProducts from "@/page/dashboard/DashboardProducts.tsx/DashboardProducts";

import DashboardOrders from "@/page/dashboard/DashboardOrder/DashboardOrders";
import DashboardSettings from "@/page/dashboard/DashboardSettings/DashboardSettings";
import DashboardUsers from "@/page/dashboard/DashboardUser/DashboardUsers";

import DashboardBookings from "@/page/dashboard/bookings/DashboardBookings";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      // PUBLIC ROUTES
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },

      // USER PROTECTED ROUTES
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tasks",
        element: (
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/counter",
        element: (
          <ProtectedRoute>
            <Counter />
          </ProtectedRoute>
        ),
      },

      // ADMIN DASHBOARD ROUTES (Role Protected)
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "products", element: <DashboardProducts /> },
          { path: "users", element: <DashboardUsers /> },
          { path: "orders", element: <DashboardOrders /> },
          { path: "settings", element: <DashboardSettings /> },
          {path: "bookings", element: <DashboardBookings></DashboardBookings>}
        ],
      },
    ],
  },
]);
