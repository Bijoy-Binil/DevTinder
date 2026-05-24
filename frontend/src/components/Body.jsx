import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGetProfileQuery } from "./profileApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);
  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileQuery(undefined, {
    skip: !!userData,
     refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (profile) {
      dispatch(addUser(profile));
    
    }
   
    if (error) {
      toast.error(error)
      navigate("/login");
    }
  }, [profile, error, dispatch, navigate]);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
