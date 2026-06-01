import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./zod/signupZod";
import { useSignupMutation } from "../Auth/services/Auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { profileApi } from "./profileApi";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName || undefined,
      emailId: values.emailId,
      password: values.password,
      age: values.age || undefined,
      gender: values.gender || undefined,
      photo_url: values.photo_url || undefined,
      about: values.about || undefined,
      skills: values.skills
        ? values.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : undefined,
    };

    try {
      await signup(payload).unwrap();
      // Cookie is set by the backend — refetch the profile so Body/Navbar update.
      dispatch(profileApi.util.invalidateTags(["Profile"]));
      toast.success("Account created! Welcome to DevTinder 🎉");
      navigate("/feed");
    } catch (err) {
      toast.error(err?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="fieldset bg-base-300 border-base-300 rounded-box w-sm border p-4"
      >
        <legend className="fieldset-legend justify-center text-center text-lg">
          Sign Up
        </legend>

        <label className="label">First Name</label>
        <input
          className="input"
          placeholder="First Name"
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}

        <label className="label">Last Name</label>
        <input
          className="input"
          placeholder="Last Name"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}

        <label className="label">Email</label>
        <input className="input" placeholder="Email" {...register("emailId")} />
        {errors.emailId && (
          <p className="text-red-500 text-sm">{errors.emailId.message}</p>
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

        <label className="label">Age</label>
        <input
          type="number"
          className="input"
          placeholder="Age"
          {...register("age")}
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}

        <label className="label">Gender</label>
        <select className="select" defaultValue="" {...register("gender")}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}

        <label className="label">Photo Url</label>
        <input
          className="input"
          placeholder="Photo Url"
          {...register("photo_url")}
        />
        {errors.photo_url && (
          <p className="text-red-500 text-sm">{errors.photo_url.message}</p>
        )}

        <label className="label">Skills</label>
        <input
          className="input"
          placeholder="Skills (comma separated)"
          {...register("skills")}
        />
        {errors.skills && (
          <p className="text-red-500 text-sm">{errors.skills.message}</p>
        )}

        <label className="label">About</label>
        <textarea
          className="textarea"
          placeholder="About"
          {...register("about")}
        />
        {errors.about && (
          <p className="text-red-500 text-sm">{errors.about.message}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-neutral mt-4"
        >
          {isLoading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
