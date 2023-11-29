import express from 'express'
import user from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
 const authrouter=express.Router();

 authrouter.post('/register',async(req,res)=>{
    try {
        const {name,email ,phone ,password}=req.body;
        
       if(!phone||!name||!email||!password){
        return res.json({
            message:"error in filling",
            success:false
        })
       }
       else if(!(phone===10)){
        return res.json({
            message:"error in no. n"
            ,success:false
        })
       }
       else{
        const hashPassword=await bcrypt.hash(password,11);
        const newUser= await user.create({
           name:name,
           email:email,
           phone:phone,
           password:hashPassword
           })
          
          return  res.json({
                    message:"User created successfully",
                    success:true
                })
       }
        
      
    } catch (error) {
        res.status(500).json({error:error.message,
        success:false
        })
    }
})


// login
authrouter.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
    const findUser=await user.findOne({email:email});
    if(!findUser){
    return  res.json({message:"User Not Registered",
               success:false  
    })
    }
    const match=await bcrypt.compare(password,findUser.password)
    if(!match){
        return res.json({
            message:"Invalid User Name Password"
        })
    }
    const token = jwt.sign({ id: user.id }, "adadadsecretket");
    res.json({
        success:true,
        message:"User Successfully Logged in",
        token,
        email

    })
    delete user.password
    } catch (error) {
        res.status(500).send({
            message:error.message,
            success:false
        })
    }
})
export default authrouter;
