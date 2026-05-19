import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../Auth/services/Auth";

const Navbar = () => {
  const user = useSelector((store) => store.user);
const [logout] = useLogoutMutation()
  return (
    <div className="navbar bg-base-300  shadow-sm">
      <div className="flex-1">
        <Link to={'/'} className="btn btn-ghost  text-xl">DevTinder 🧑‍💻</Link>
   
      <Link to={"/profile"} >Profile</Link>
        <Link to={"/feed"} className="ml-7">Feed</Link></div>  
    
      {user && (
        <div className="flex items-center gap-2">
          <p>Welcome,{user?.firstName}</p>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex="0"
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photo_url || ""}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link onClick={()=>logout()}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
