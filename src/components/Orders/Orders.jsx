import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../../context/authContext';
import './order.css'
export default function Orders() {
    const { auth } = useContext(AuthContext);
    const email = auth.email;
    const [myorder, setMyOrder] = useState([]);
    const [previousOrders, setPreviousOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:7878/fetchorder", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify({ email }),
                });

                const data = await response.json();
                setMyOrder(data.order);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const userOrder = myorder.find((item) => item.email === email);

        if (userOrder) {
            const { previousorder } = userOrder;
            setPreviousOrders(previousorder || []); // Set an empty array if previousorder is undefined
        }
        // console.log(typeof (previousOrders))
    }, [myorder, email]);

    return (
        <div>
            <Navbar />
            <h1 className='txt-cntr my-20'>Your Orders</h1>
            {
                previousOrders.map((item) => (
                    // Render each item here
                    <div key={item.id} className='media'>
                        <h1>{item.Date}</h1>
                        <div className="order-ctn"></div>
                        {
                            item.Myorder.map((item) => {
                                return <>
                                   <div className='flex '>
                                   <img src={item.image} className='order-img' alt="" />
                                    <h3 className='title'>{item.title}</h3>
                                   </div>
                                </>
                            })
                        }
                        <h3 className='total'>Total Amount-${item.total}</h3>
                    </div>
                ))
            }
        </div>
    );
}
