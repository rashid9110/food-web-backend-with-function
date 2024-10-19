

const express=require('express');
const { addProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddlewares');


const productRouter=express.Router();

productRouter.post('/',uploader.single('productImage'), addProduct);//this is the route registration

module.exports=productRouter;//exporting the router