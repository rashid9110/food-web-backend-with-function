const Order = require("../schema/orderSchema");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/InternalServerError");
const mongoose = require("mongoose");

async function createNewOrder(orderDetails) {
    // Check for required fields
    if (!orderDetails.totalPrice) {
        throw new BadRequestError(['The totalPrice field is required.']);
    }

    if (!orderDetails.user || !mongoose.Types.ObjectId.isValid(orderDetails.user)) {
        throw new BadRequestError(['The user field must be a valid ObjectId.']);
    }

    try {
        const order = await Order.create(orderDetails);
        return order;
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessages = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            throw new BadRequestError(errorMessages);
        }
        console.log(error);
        throw new InternalServerError();
    }
}


async function getOrderByUserId(userId) {
    try {
        const order = await Order.find({ user: userId }).populate('items.product');
        return order;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function getOrderById(orderId) {
    try {
        console.log("orderId",orderId);
        const order= await Order.findById(orderId ).populate('items.product');
        console.log("order",order);
        return order;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function updateOrderStatus(orderId, status) {
    try {
        const order = await Order.findByIdAndUpdate(orderId, {status:status},{new: true  }).populate('items.product');;
        return order;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}
module.exports = {
    createNewOrder,
    getOrderByUserId,
    getOrderById,
    updateOrderStatus,
};
