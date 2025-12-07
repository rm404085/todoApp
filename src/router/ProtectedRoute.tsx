import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "@/redux/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname }} 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

