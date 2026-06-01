import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGetProfileQuery } from "./profileApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
const authRoutes = ["/login", "/signup"];

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

    // Don't bounce the user off the auth pages (login/signup) when there is
    // no session yet — only protected pages should redirect to login.
    if (error && !authRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [profile, error, dispatch, navigate, location.pathname]);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
