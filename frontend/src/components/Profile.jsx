import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"

const Profile = () => {
   const userData = useSelector((store) => store.user);
  return (
    <div><EditProfile userData={userData}/></div>
  )
}
export default Profile