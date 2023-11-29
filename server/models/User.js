import mongoose from "mongoose";

const Users=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:6
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength: 8,
    }
    
})

const user=mongoose.model("Users",Users)
export default user;