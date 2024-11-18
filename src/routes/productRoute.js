

const express=require('express');
const { addProduct, getProduct, deleteProduct, getProducts } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddlewares');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');


const productRouter=express.Router();

productRouter.post(
    '/',
    isLoggedIn,
    isAdmin,
    uploader.single('productImage'), 
    addProduct
);//this is the route registration

productRouter.get('/:id', getProduct);
productRouter.get('/', getProducts);

productRouter.delete('/:id', deleteProduct);

module.exports=productRouter;//exporting the router