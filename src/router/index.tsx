import App from "@/App";
import Counter from "@/components/Counter/Counter";
import Products from "@/components/Products/Products";
import Tasks from "@/components/tasks/Tasks";
import Login from "@/page/login/Login";
import Register from "@/page/login/register/Register";
import WishlistPage from "@/page/WishList/WishListPage";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ProductDetails from "@/components/Products/ProductsDetails";
import DashboardLayout from "@/layout/DashboardLayout";
import DashboardHome from "@/page/dashboard/DashboardHome";
import DashboardProducts from "@/page/dashboard/DashboardProducts.tsx/DashboardProducts";
import DashboardUsers from "@/page/dashboard/DashboardUser/DashboardUsers";
import DashboardOrders from "@/page/dashboard/DashboardOrder/DashboardOrders";
import DashboardSettings from "@/page/dashboard/DashboardSettings/DashboardSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },

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
        element: <ProductDetails></ProductDetails>
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
        // DASHBOARD ROUTES (Protected হলে পরে logic দিব)
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "products", element: <DashboardProducts /> },
      { path: "users", element: <DashboardUsers /> },
      { path: "orders", element: <DashboardOrders /> },
      { path: "settings", element: <DashboardSettings /> },
    ],
  },
    ],
  },
]);
