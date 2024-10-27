const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    item:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
 
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true,

    },
    status:{
        type:String,
        default:"ORDERED",
        enum:["ORDERED","CANCELLED","DELIVERED","PROCESSING","OUT_FOR_DELIVERY"],
    },
    address:{
        type:String,
        minLength:[10,"Address should be of atleast 10 characters"],
    },
    paymentMethod:{
        type:String,
        enum:["ONLINE","CASE"],
        default:"CASE",
    }
},{
timestamps:true,
})

const Order=mongoose.module('Order',orderSchema);
module.exports=Order;