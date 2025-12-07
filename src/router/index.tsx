import App from "@/App";
import Counter from "@/components/Counter/Counter";
import Products from "@/components/Products/Products";
import Tasks from "@/components/tasks/Tasks";
import Login from "@/page/login/Login";
import Register from "@/page/login/register/Register";
import WishlistPage from "@/page/WishList/WishListPage";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

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
    ],
  },
]);
