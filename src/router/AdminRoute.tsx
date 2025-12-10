
import type { RootState } from "@/redux/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// 👈 your store type

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <>{children}</>;
}
