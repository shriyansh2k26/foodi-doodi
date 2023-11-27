import mongoose from "mongoose";

const MenuSchema=new mongoose.Schema({
    id:{
        type:String,
        unique:true,

    },

    image:{
       type: String},
    title:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
    description:{
        type:String},
    price:{
        type:String
    }
})

const menu=mongoose.model('menu',MenuSchema)
export default menu;