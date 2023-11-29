import React, { useState } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Register() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const resposne = await fetch("https://foodservers.onrender.com/auth/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, phone, password, email
                })
            }
            );

            const data = await resposne.json();
            // console.log(data.success);
            if (data.success) {
                toast.success('Account Created Successfully', {
                    position: "top-center",
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                const navigateToLogin = () => {
                    navigate('/auth/login');
                }
                navigateToLogin();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div class="container">
            <h2>Register to Food App</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" onChange={(e) => setName(e.target.value)} value={name} name="username" placeholder='Min 6 char' required />
                </div>
                <div class="form-group">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Min 8 char' value={password} required />
                </div>
                <input type="submit" value="Register" />
                <span><Link to='/auth/login'>Already a User? Login</Link></span>
            </form>
        </div>
    )
}