

const express=require('express');
const { addProduct, getProduct, deleteProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddlewares');


const productRouter=express.Router();

productRouter.post('/',uploader.single('productImage'), addProduct);//this is the route registration
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct);

module.exports=productRouter;//exporting the router