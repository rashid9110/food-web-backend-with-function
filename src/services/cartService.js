const { getCartByUserId } = require("../repositories/cartRepositories");
const NotFoundError = require("../utils/notFoundError");

async function getCart(userId) {
    const cart =await getCartByUserId(userId);
    console.log(cart)

    if(!cart){
        throw new NotFoundError("Cart");
    }

    return cart;
}

module.exports={
    getCart
}