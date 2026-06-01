import { useForm } from "react-hook-form";
import { loginSchema } from "./zod/loginZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../Auth/services/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { profileApi } from "./profileApi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  console.log("error==>", error);

  const handleLogin = async (data) => {
    try {
      const datas = { emailId: data.email, password: data.password };
      const user = await login(datas).unwrap();
      dispatch(profileApi.util.invalidateTags(["Profile"]));
      navigate("/feed");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend text-center">Login</legend>

        <label className="label">Email</label>
        <input className="input" placeholder="Email" {...register("email")} />

        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>

        <p className="text-center text-sm mt-3">
          New to DevTinder?{" "}
          <Link to="/signup" className="link link-primary">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
