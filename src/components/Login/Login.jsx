import React, { useContext, useState } from 'react'
import './login.css'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/authContext';
import { toast } from 'react-toastify'; 
export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const {auth,setAuth}=useContext(AuthContext);
 const handleLogin=async(e)=>{
  e.preventDefault();
  const response=await fetch("http://localhost:7878/auth/login",{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        email,password
    })
  })
  const data=await response.json();
  if(data.success){
    toast.success('Logged In Successfully', {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    const navigateToHome=()=>{
        navigate('/')
    }
    navigateToHome();
    setAuth({
      ...auth,
      token:data.token,
      email:data.email
    })
    localStorage.setItem('auth',JSON.stringify(data))
  }
  else{
    toast.error('Invalid Credentials', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      }); 
  }
 }
  return (
    <div class="container-lgn">
    <h2>Login to Food App</h2>
    <form onSubmit={handleLogin}>
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required/>
        </div>
        <input type="submit" value="Login"/>
        <span><Link to='/auth/register'>New User? Register</Link></span>
    </form>
</div>
  )
}
