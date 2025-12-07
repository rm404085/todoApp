import { logout } from "@/redux/features/auth/authSlice";
import { UseAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());   // redux state clear
    navigate("/login", { replace: true }); // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
