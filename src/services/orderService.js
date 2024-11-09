const { getCartByUserId, clearCart } = require("../repositories/cartRepositories");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require("../utils/badRequestError");
const { findUser } = require("../repositories/userRepository");
const { createNewOrder, getOrderByUserId, getOrderById, updateOrderStatus } = require("../repositories/orderRepository");
const InternalServerError = require("../utils/InternalServerError");

async function createOrder(userId,paymentMethod) {
    console.log("paymentMethod: ", paymentMethod);
    const cart=await getCartByUserId(userId);
    const user=await findUser({_id:cart.user});

    if(!cart) {
        throw new NotFoundError("Cart");
    }

    if(cart.items.length===0){
        throw new BadRequestError("Cart");
    }

    const orderObject={};

    orderObject.user=cart.user;
    orderObject.items=cart.items.map(cartItem=>{
        return {
            product:cartItem.product._id,
            quantity:cartItem.quantity
        }
    });
    orderObject.status=cart.status;
    orderObject.totalPrice=0;

    cart.items.forEach(cartItem=>{
        orderObject.totalPrice+=cartItem.product.price*cartItem.quantity;
    });

    orderObject.address=user.address;
    orderObject.paymentMethod=paymentMethod;
    const order=await createNewOrder(orderObject);

    if(!order){
        throw new InternalServerError();
    }

    await clearCart(userId)
    return order;
}

async function getAllOrdersCreateByUser(userId) {
    const orders=await getOrderByUserId(userId);
    if(!orders){
        throw new NotFoundError("Order");
    }
    return orders;
}

async function getOrderDetailsById(orderId) {
    const order=await getOrderById(orderId);
    if(!order){
        throw new NotFoundError("Order");
    }
    return order;
}

async function updateOrder(orderId, status) {
    const order=await updateOrderStatus(orderId,status);
    if(!order){
        throw new NotFoundError("Order");
    }
    return order;
}

module.exports={
    createOrder,
    getAllOrdersCreateByUser,
    getOrderDetailsById,
    updateOrder,
}