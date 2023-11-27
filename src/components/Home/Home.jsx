import React from 'react'

import Navbar from '../Navbar/Navbar'
import MovingComponent from 'react-moving-text'
import '../../utils.css'
import './home.css'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate=useNavigate();
  const gotomenu=()=>{
 navigate('/menu')
  }
  return (
  <>
  <Navbar/>
  <div className='home-flx'>
  

<MovingComponent

  type="popIn"
  duration="1000ms"
  delay="0s"
  direction="normal"
  timing="ease"
  iteration="1"
  fillMode="forwards">
    <div className='text'>
  <h1 className='txt-cntr'>Welcome to the Restraunt</h1>
  <h3 className='txt-cntr'>Bienvenue au restaurant</h3>
    </div>
</MovingComponent>

<img src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='img-hm' alt="" />
  <button className='orderNow' onClick={gotomenu}>Order Now</button>
  </div>


  </>
  )
}
