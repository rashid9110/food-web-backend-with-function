const express=require('express');

const { isLoggedIn, isAdmin } = require('../validation/authValidator');
const { createNewOrder, getAllOrdersByUser, getOrder, cancelledOrder, changeOrderSatatus } = require('../controllers/orderController');


const orderRouter=express.Router();

orderRouter.post('/',isLoggedIn,createNewOrder)
orderRouter.get('/',isLoggedIn,getAllOrdersByUser)
orderRouter.get('/:orderId',isLoggedIn,getOrder)
orderRouter.put('/:orderId/cancel',isLoggedIn,cancelledOrder)
orderRouter.put('/:orderId/status',isLoggedIn,isAdmin,changeOrderSatatus)

module.exports=orderRouter;