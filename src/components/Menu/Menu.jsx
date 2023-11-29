import React, { useContext, useEffect } from 'react'
import '../../utils.css'
import './menu.css'
import { toast } from 'react-toastify';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { MdAdd, MdHorizontalRule } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar from '../Navbar/Navbar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import { BiDish, BiSolidChevronRight } from "react-icons/bi";
import { useState } from 'react';
import { MenuContext } from '../../context/menuContext';
import { CartContext } from '../../context/cartContext';
import { AuthContext } from '../../context/authContext';
export default function Menu() {
  const { addToCart, cart, increase, decrease, setCart, deleteItem } = useContext(CartContext);

  const { auth } = useContext(AuthContext)
  const { email } = auth
  // console.log(email)
  let totalAmt = 0;
  cart.forEach(element => {
    totalAmt += element.amount * element.price
  });
  const [filter, setFilter] = useState("");
  const { menu } = useContext(MenuContext);
  const [Menu, setMenu] = useState(menu)

  // console.log(cart)
  const [sidebar, setSidebar] = useState(false);
  const ToggleSidebar = () => {
    setSidebar(!sidebar);
  }
  const orderCheckout = {
    Date: new Date(),
    Myorder: cart,
    total: totalAmt
  }

  const filterMenu = (category) => {
    const filter = menu.filter((item) => {
      return item.category === category
    })
    setMenu(filter)
  }
  // console.log(Menu)

  const handleCheckout = async () => {
    if(!email){
      toast.info('Loggin first before checkout', {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      const response = await fetch("https://foodservers.onrender.com/orders", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          orderCheckout
        })
      })
      const data = response.json();
      // console.log(data)
      if(data){
         toast.success('Order Placed', {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      }
      setCart([])
    }
    setSidebar(!sidebar)
  }

  return (
    <>

      <Navbar />
      <h2 className='header'>What Do You Want To Order</h2>
      <div className='flex jus-center menu-ctn'>
        <div className="pizza foodi-img" onClick={() => { filterMenu('pizza') }}>
          <img className='foodi' src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="pizza" />
          <h3 className='txt-cntr'>Pizza</h3>
        </div>
        <div className="biryani foodi-img" onClick={() => { filterMenu('drinks') }}>
          <img  className="foodi"src="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=600" alt="biryani" />
          <h3 className='txt-cntr'>Beverages</h3>
        </div>
        <div className='northIndian foodi-img' onClick={() => { filterMenu('biryani') }}>
          <img className="foodi" src="https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="nortthindian" />
          <h3 className='txt-cntr'>North Indian</h3>
        </div>
        <div className="southIndian foodi-img" onClick={() => { filterMenu('south indian') }}>
          <img className="foodi" src="https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="south" />
          <h3 className='txt-cntr'>South Indian</h3>
        </div>
        <div className="chinese foodi-img" onClick={() => { filterMenu('chinese') }}>
          <img className="foodi" src="https://images.pexels.com/photos/18803174/pexels-photo-18803174/free-photo-of-momos-dumplings-with-sauces.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="chinease" />
          <h3 className='txt-cntr'>Chinese</h3>
        </div>
      </div>
      <div className="menuDisplay">
        <div>
          <h4 className='section'>Best foodsfor you</h4>
          <h5 className='section1' onClick={() => { setMenu(menu) }}>All Menu</h5>
        </div>
        <div className="menuItem flex sp-even ">
          {
            Menu.length !== 0 ? Menu.map((item) => {
              return (
                <>
                  <Card className="card" key={item.id} sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          ${item.price}
                        </Typography>
                        <Button variant="outlined" onClick={() => { addToCart(item.id, item) }}>Add</Button>

                      </CardContent>
                    </CardActionArea>

                  </Card>
                </>
              )
            }) :
              menu.map((item) => {
                return (
                  <>
                    <Card className="card" key={item.id} sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.image}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                            ${item.price}
                          </Typography>
                          <Button variant="outlined" onClick={() => { addToCart(item.id, item) }}>Add</Button>

                        </CardContent>
                      </CardActionArea>

                    </Card>
                  </>
                )
              })

          }

        </div>
      </div>
      <div >
        {
          sidebar ?
            <><div className="openSidebar">
              <BiSolidChevronRight className='icons' onClick={ToggleSidebar} />
              <h4 className='txt-cntr checkout-hd'>Checkout</h4>
              {cart.length === 0 ? <h3 className='txt-cntr my-20'>No items!!!</h3> : <>
                <div className="Scroll">
                  {
                    cart.map((item) => {
                      return (<>
                        <div className='cart_item flex' key={item.id}>
                          <img src={item.image} className='checkout-img' alt="" />
                          <div>
                            <h3>{item.title}</h3>
                            <h6>${item.price}</h6>
                          </div>
                          {/* <h6 className='amt'>Total-${item.amount*item.price}</h6> */}
                          <div className="checkout-item flex sp-btn">
                            <div className="flex sp-even my-20 wd-150">
                              <MdAdd className="cart-icon" onClick={() => { increase(item, item.id) }} />
                              <span>{item.amount}</span>
                              <MdHorizontalRule className='cart-icon' onClick={() => { decrease(item, item.id) }} />
                            </div>
                            <AiOutlineDelete className='cart-icon my-20' onClick={() => { deleteItem(item.id) }} />
                          </div>
                        </div>

                      </>)
                    })
                  }
                </div>
                <div className='totalamt'>
                  <h1>Total Amount - $ {totalAmt}</h1>
                  <button className='checkoutitem' onClick={handleCheckout}>Checkout</button>
                </div>
              </>}
            </div>
            </> : <>
             <div className="badge closedSidebar">
              <Badge  badgeContent={cart.length} color="primary">
             <BiDish className='icons' onClick={ToggleSidebar} />
              {/* <MailIcon color="action" /> */}
              </Badge>
             </div>
            
            </>
        }
      </div>

    </>
  )
}
