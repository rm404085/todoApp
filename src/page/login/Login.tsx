import { useLoginUserMutation } from "@/redux/api/baseApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { UseAppDispatch } from "@/redux/hook";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // where user came from before login
  const redirectPath = location.state?.from || "/products";

  const onSubmit = async (data: any) => {
    try {
      const res = await loginUser(data).unwrap();

      dispatch(setCredentials({ token: res.token }));

      alert("Login Successful!");

      // redirect to original page
      navigate(redirectPath, { replace: true });
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-5">Login</h2>

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
