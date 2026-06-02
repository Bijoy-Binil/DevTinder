import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditProfileSchema } from "./zod/EditProfile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import FeedCard from "./FeedCard";
import { useEditProfileMutation } from "./profileApi";
import { toast } from "react-toastify";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ userData }) => {
  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
  });
  const [editProfile] = useEditProfileMutation();
  const { register, handleSubmit, reset, watch } = form;
  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        age: userData.age || "",
        gender: userData.gender || "",
        photo_url: userData.photo_url || "",
        about: userData.about || "",
      });
    }
  }, [userData, reset]);

const dispatch = useDispatch();
const handleEditProfile = async (data) => {
  try {

    const updatedUser = await editProfile(data).unwrap();

    // Only trust a real user object so a malformed response can't corrupt state.
    if (updatedUser && updatedUser._id) {
      dispatch(addUser(updatedUser));
    }

    toast.success("Successfully Edited!!");

  } catch (err) {
    // Surface the real backend validation message instead of a generic string.
    toast.error(err?.data?.message || "Failed to update profile");
  }
};
  const watchedValues = watch();
  return (
    <>
      <div className="flex justify-center gap-10 items-start my-10">
        {/* FORM */}
        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4"
        >
          <legend className="fieldset-legend justify-center text-center">
            Edit Profile
          </legend>

          <label className="label">First Name</label>
          <input
            className="input"
            {...register("firstName")}
            placeholder="First Name"
          />

          <label className="label">Last Name</label>
          <input
            className="input"
            {...register("lastName")}
            placeholder="Last Name"
          />

          <label className="label">Age</label>
          <input
            type="number"
            className="input"
            {...register("age")}
            placeholder="Age"
          />

          <label className="label">Gender</label>
          <select className="select" {...register("gender")}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="label">Photo Url</label>
          <input
            className="input"
            {...register("photo_url")}
            placeholder="Photo Url"
          />

          <label className="label">About</label>
          <textarea {...register("about")} placeholder="About" />

          <button type="submit" className="btn btn-primary mt-4">
            Save Profile
          </button>
        </form>

        {/* CARD */}
        <FeedCard
          data={{
            ...userData,
            ...watchedValues,
          }}
        />
      </div>
    </>
  );
};
export default EditProfile;
