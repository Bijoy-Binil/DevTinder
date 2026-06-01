import {BrowserRouter,Routes,Route} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import { ToastContainer, toast } from 'react-toastify';
import Connections from "./components/Connections"
import Requests from "./components/Requests"

const App = () => {
  return (
    <div >

      <BrowserRouter basename='/'>
      <Routes>
      <Route path='/' element={<Body/>}>
        <Route path='login' element={<Login/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='feed' element={<Feed/>}/>
        <Route path='connections' element={<Connections/>}/>
        <Route path='request' element={<Requests/>}/>
      </Route>
     
      </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="colored" // Options: "light", "dark", "colored"
      />
    </div>
  )
}
export default App