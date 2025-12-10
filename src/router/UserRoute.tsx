// UserRoute.tsx
import type { RootState } from "@/redux/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface UserRouteProps {
  children: ReactNode;
}

export default function UserRoute({ children }: UserRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== "user") {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}
