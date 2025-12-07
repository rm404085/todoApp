import { useRegisterUserMutation } from "@/redux/api/baseApi";
import { useForm } from "react-hook-form";


const Register = () => {
  const { register, handleSubmit } = useForm();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit = async (data: any) => {
    try {
      const res = await registerUser(data).unwrap();
      alert("User Registered Successfully!");
      console.log(res);
    } catch (err) {
      alert("Registration Failed!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-5">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("username")} className="w-full border p-2 rounded" placeholder="Username" />
        <input {...register("email")} className="w-full border p-2 rounded" placeholder="Email" />
        <input {...register("phone")} className="w-full border p-2 rounded" placeholder="Phone" />
        <input {...register("password")} className="w-full border p-2 rounded" placeholder="Password" />

        <button className="w-full bg-green-600 text-white p-2 rounded" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
