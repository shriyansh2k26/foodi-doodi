import mongoose from 'mongoose'

const OrderSchema=new mongoose.Schema({
    email:{
        type:String
    },
    previousorder:{
      type:Array
    },
})

const order= mongoose.model('order',OrderSchema)
export default order;    
