const Cart=require('../schema/cartSchema');
const InternalServerError = require('../utils/InternalServerError');
const NotFoundError = require('../utils/notFoundError');

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
        }).populate('items.product');
        return cart;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function clearCart(userId) {
    try {
        // Await the Cart.findOne() call to resolve before proceeding
        const cart = await Cart.findOne({ user: userId });
        console.log(cart);

        // Check if the cart exists
        if (!cart) {
            throw new NotFoundError("Cart not found");
        }

        // Clear items in the cart
        cart.items = [];
        await cart.save();  // Corrected typo here

        return cart;
    } catch (error) {
        throw new InternalServerError();
    }
}

module.exports={
    createCart,
    getCartByUserId,
    clearCart
} 