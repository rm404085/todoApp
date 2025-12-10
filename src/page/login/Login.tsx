import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "@/redux/endPoints/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { UseAppDispatch } from "@/redux/hook";

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || "/products";

  // 👇 Local state for role selection
  const [role, setRole] = useState<"user" | "admin">("user");

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await loginUser(data).unwrap();

      // ✅ Redux–এ token + user + role save
      dispatch(
        setCredentials({
          token: res.token,
          user: {
            name: data.username,
            email: `${data.username}@example.com`,
            role: role,
          },
        })
      );

      alert("Login Successful!");

      // ✅ Redirect according to role
      if (role === "admin") navigate("/dashboard", { replace: true });
      else navigate(redirectPath, { replace: true });
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-5">Login</h2>

      {/* 👇 Role selection */}
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="role"
            value="user"
            checked={role === "user"}
            onChange={() => setRole("user")}
          />{" "}
          User
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={() => setRole("admin")}
          />{" "}
          Admin
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("username")}
          className="w-full border p-2 rounded"
          placeholder="Username"
        />
        <input
          {...register("password")}
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
