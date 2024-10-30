const { getCartByUserId, clearCart } = require("../repositories/cartRepositories");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require("../utils/badRequestError");
const { findUser } = require("../repositories/userRepository");
const { createNewOrder } = require("../repositories/orderRepository");
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

module.exports={
    createOrder,
}