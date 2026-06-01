import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditProfileSchema } from "./zod/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FeedCard from "./FeedCard";
import { useEditProfileMutation } from "./profileApi";
import { toast } from "react-toastify";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ userData }) => {
  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
  });
  const [editProfile, { isLoading, isSuccess, error }] =
    useEditProfileMutation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = form;
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

    dispatch(addUser(updatedUser));

    toast.success("Successfully Edited!!");

  } catch (err) {
console.error(err.message)
    toast.error("Failed to update profile");

  }
};
  const { firstName, lastName, age, gender, about, photo_url } = userData || {};
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
          <input
            className="input"
            {...register("gender")}
            placeholder="Gender"
          />

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
