const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
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
    ]
},{
timestamps:true
})

const cart =mongoose.model('Cart',cartSchema)
module.exports=cart;