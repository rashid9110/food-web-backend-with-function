const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    productName:{
       type:String,
       maxlength:[30,'product name should be 30 or leas then 30 character'],
       minlength:[5,'product name at lest 5 character'],
       required:[true,'prodect name is required'],
       lowercase:true
    },
    description:{
       type:String,
       minlength:[5,'product description must be atleast 5 characters'],
    },
    productImage:{
        type:String,
    },
    quantity:{
        type:Number,
        required:[true,'Quantity most be required'],
        default:10,
    },
    price:{
        type:Number,
        required:[true,'Price most be required'], 
        tirm:true,
    },
   category:{
    type:String,
    enum:['veg','non-veg','drinks','sides'],  
    default:'veg'
   },
   inStock:{
    type:Boolean,
    required:[true,'In stock status is required'],
    default:true,
   }

},{
    timestamps:true,
})

const Product=mongoose.model('Product',productSchema);

module.exports={
   Product,
}  