import express, { Router } from 'express'
import order from '../models/Order.js';
const orderRouter = express.Router();

orderRouter.post('/orders', async (req, res) => {

    const { email, date, orderCheckout } = req.body;
    // console.log(cart)
    const checkOrder = await order.findOne({ email:email });
    if (!checkOrder) {
        await order.create({
            email:email,
            previousorder: orderCheckout
        })
        return res.json({
            status: 'ok',
            success: true,
            message: "ordered placed"
        })
    }
    await order.updateOne({email:email},{$push:{previousorder:orderCheckout}})
    res.json({
        message:"order added",
        success:true
    })

})
orderRouter.get('/fetchorder',async(req,res)=>{
    // const {email}=req.body
    // console.log(email)
    const orders=await order.find()
    res.send({
        message:"success",
        order:orders})
})
export default orderRouter;