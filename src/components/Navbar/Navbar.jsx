import React, { useContext } from "react";
import { NavLink,Link, useNavigate } from "react-router-dom";
import '../../utils.css'
import './navbar.css'
import MovingText from 'react-moving-text'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "../../context/authContext";
export default function Navbar() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigatetoprofile=useNavigate();
    const handleLogout = () => {
        setAuth({
            token: null,
            email: ""
        })
    }
    const toprofile=()=>{
        navigatetoprofile('/profile')
    }
    const adminEmail = "admin@123"
    const navigateTomenu=useNavigate();
    const navigateToorder=useNavigate()
    const navigateTohome=useNavigate()
        
    
    return (
        <header className="">
            <nav className="flex sp-btn">
                <div className=" left-ctn flex itm-cntr">
                    <img className="navlogo" onClick={()=>{const navigate=()=>{
                             navigateTohome('/')
                    }
                    navigate()
                    }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm5RFDmJ_kEY3RBIRLEupEecBjKX_Tsn3Drg&usqp=CAU" alt="LOGO" />
                    <ul className="flex  jus-center itm-cntr">
                        {/* <li><NavLink className="item">Location</NavLink></li> */}
                        <li><NavLink className="item" to="/menu" >Menu</NavLink></li>
                        {/* <li><NavLink className="link flex item-center" to="/jwellery"></NavLink></li> */}
                    </ul>
                </div>
                <div className="flex jus-center rth-ctn itm-cntr">




                    {
                        !auth.token ? <> <div className="cart mx-2"><NavLink className="item-lgn" to="/auth/login">Login</NavLink></div></> :

                            <>
                                {
                                    auth.email !== adminEmail ?
                                        <>
                                            {/* <img className="profile-img" src="" alt="Profile" /> */}
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" className="myprofile" id="dropdown-basic" >
                                                    My Profile
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {/* <Dropdown.Item  onClick={toprofile}> My Profile</Dropdown.Item> */}
                                                    <Dropdown.Item onClick={()=>{
                                                        const toOrder=()=>{
                                                            navigateToorder('/profile/orders')
                                                        }
                                                        toOrder();
                                                    }}>Orders</Dropdown.Item>
                                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </> :
                                        <>
                                            
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" className="myprofile" id="dropdown-basic" >
                                                    Admin
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {/* <Dropdown.Item >My Profile</Dropdown.Item> */}
                                                    <Dropdown.Item onClick={()=>{
                                                        const navigate=()=>{
                                                            navigateTomenu('/admin')
                                                        }
                                                        navigate();
                                                    }}>Edit Items</Dropdown.Item>
                                                    <Dropdown.Item >Orders</Dropdown.Item>
                                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </>
                                }

                            </>
                    }

                    {/* {
                !auth.user ? <>
                    <div className="profile mx-2"><NavLink className="link flex item-center" to="/login">Login</NavLink></div>
                </>
                    :
                    <>
                        <div className="dropdown">
                            <button className="dropbtn">Profile</button>
                            <div className="dropdown-content">
                                <NavLink to='/profile'>My Profile</NavLink>
                                <NavLink >Logout</NavLink>

                            </div>
                        </div>
                    </>
            } */}
                    {/* <div className="cart mx-2"><NavLink className="link flex item-center" to="/register">Register</NavLink></div> */}
                </div>
            </nav>
        </header>
    );
}

