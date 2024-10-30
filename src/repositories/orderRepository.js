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

module.exports = {
    createNewOrder
};
