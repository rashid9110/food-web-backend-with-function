const Cart=require('../schema/cartSchema');
const InternalServerError = require('../utils/InternalServerError');

async function createCart(userId) {
    try {
        const newCart=await Cart.create({
            user:userId
        })
        return newCart;
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Extract validation error messages
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property]?.message || 'Validation error';
            });
            throw new BadRequestError(errorMessageList); // Assuming BadRequestError accepts an array
        }
        console.log(error);
        throw new InternalServerError();
    }
}

async function getCartByUserId(userId) {
    try {
        console.log(userId)
        const cart =await Cart.findOne({
            user:userId
        })
        return cart;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports={
    createCart,
    getCartByUserId,
} 