import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import helmet from 'helmet';
import authrouter from './authRoutes/routes.js'

import path from 'path'
import menurouter from './menuRoutes/menu.js';
import orderRouter from './orderRoutes/order.js';
const app=express();
app.use(express.json())
app.use(cors());
app.use(helmet());
// image upload

// Routes
app.use('/auth',authrouter)
app.use('/',menurouter)
app.use('/',orderRouter)
// database connect
mongoose.connect("mongodb+srv://shriyanshsingh28:6QjoFpfd3KXOOUGy@cluster0.yvhehlo.mongodb.net/?retryWrites=true&w=majority",{
useNewUrlParser:true,
useUnifiedTopology:true
})
.then(()=>{
    console.log("connected too dataabase")
    app.listen(7878,()=>{
        console.log("listening to 7878")
    })
})
.catch((error)=>{
    console.log(`cant connect ${error}`)
})
