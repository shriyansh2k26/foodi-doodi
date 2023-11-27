import { Route,Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Menu from './components/Menu/Menu'
import Admin from "./components/AdminPage/Admin";
import Profile from "./components/Profile/Profile";
import Orders from "./components/Orders/Orders";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home/>}/>      
      <Route path="/menu" element={<Menu/>}/>      
      <Route path="/auth/login" element={<Login/>}/>
      {/* <Route path="/admin" element={<Admin/>}/> */}
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/profile/orders" element={<Orders/>}/>

      <Route path="/auth/register" element={<Register/>}/>
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
